package com.example.ebanking.controller;

import com.example.ebanking.entity.*;
import com.example.ebanking.service.*;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.sql.Date;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.LongSummaryStatistics;
import java.util.stream.LongStream;
import java.util.stream.Stream;

@RestController
@RequestMapping("/user")
public class SendDepositController {

    @Autowired
    private SendDepositService sendDepositService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private MailService mailService;
    @Autowired
    private BalanceService balanceService;
    @Autowired
    private BankAccountService bankAccountService;
    @Autowired
    private UserService userService;

    @PostMapping("/send/{balance}/{id}/{email}")
    public ResponseEntity<?> sendMoney(@PathVariable BigInteger balance, @PathVariable int id, @PathVariable String email,
                                       @RequestBody Send theSend) {
        if (bankAccountService.findByAccountNo(theSend.getReceiveAccountNo()) == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        theSend.setSendingDate(new Date(System.currentTimeMillis()));
        theSend.setStatus(1);
        Users theUser = userService.findByAccountNo(theSend.getReceiveAccountNo());
        BankAccount theBankAccount = bankAccountService.findByAccountNo(theSend.getReceiveAccountNo());
        BigInteger newBalance = balance.subtract(theSend.getAmount());
        BigInteger newAccountNo = theSend.getAccountNo();
        Balance theBalance = balanceService.getBalance(theSend.getReceiveAccountNo());
        BigInteger addNewBalance = theBalance.getBalance().add(theSend.getAmount());
        BigInteger addNewAccountNo = theBalance.getAccountNo();
        int res = theSend.getAmount().compareTo(BigInteger.valueOf(1000));
        if (res < 0) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            sendDepositService.save(theSend);
            sendDepositService.setDeposit(theSend.getReceiveAccountNo(), theSend.getSendAccountNo(), theSend.getReceiveAccountNo(), theSend.getAmount());
            transactionService.setTransactions(theSend.getAccountNo(), theSend.getAmount(), "Send money to " + theBankAccount.getName(),
                    1, "Send Money", "debit");
            transactionService.setTransactions(theSend.getReceiveAccountNo(), theSend.getAmount(),
                    "Receive money from " + theSend.getName(), theSend.getStatus(), "Receive Money", "credit");
            balanceService.updateBalance(newBalance, newAccountNo, id);
            balanceService.updateBalance(addNewBalance, addNewAccountNo, theBalance.getId());
            mailService.transactionMail(email, "Send Money Successfully",
                    "Your send money is successful to." + theBankAccount.getName() + " \n Account No: " + theSend.getAccountNo() + "\nSend Amount: " + theSend.getAmount() +
                            "\nMain Account Balance" + newBalance + "\nDate: " + new Date(System.currentTimeMillis()) + "\n\nThank you for using E Banking appliction.");
            if (theUser != null) {
                mailService.transactionMail(theUser.getEmail(), "Receive Money",
                        "Receive money from." + theSend.getName() + " \n Your account no: " + theSend.getReceiveAccountNo() + "\nReceive Amount: " + theSend.getAmount() +
                                "\nMain Account Balance" + addNewBalance + "\nDate: " + new Date(System.currentTimeMillis()) + "\n\nThank you for using E Banking appliction.");
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
