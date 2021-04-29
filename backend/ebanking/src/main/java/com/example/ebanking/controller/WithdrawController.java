package com.example.ebanking.controller;

import com.example.ebanking.entity.BankWithdraw;
import com.example.ebanking.entity.BkashUtility;
import com.example.ebanking.entity.MobileWithdraw;
import com.example.ebanking.entity.Transactions;
import com.example.ebanking.service.BalanceService;
import com.example.ebanking.service.MailService;
import com.example.ebanking.service.TransactionService;
import com.example.ebanking.service.WithdrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.sql.Date;

@RestController
@RequestMapping("/user")
public class WithdrawController {

    @Autowired
    private WithdrawService withdrawService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private BalanceService balanceService;
    @Autowired
    private MailService mailService;
    @Autowired
    private BkashUtility bkashUtility;

    @PutMapping("/checkout/payment/b2cPayment/{balance}/{id}/{email}")
    public ResponseEntity<?> sendMoney(@PathVariable BigInteger balance, @PathVariable String email, @PathVariable int id,
                                       @RequestBody MobileWithdraw mobileWithdraw, Transactions theTransactions) {
        mobileWithdraw.setWithdrawType("Bkash");
        BigInteger newBalance = balance.subtract(mobileWithdraw.getAmount().add(bkashUtility.getB2cFee()));
        BigInteger newAccountNo = mobileWithdraw.getAccountNo();
        int res = mobileWithdraw.getAmount().compareTo(BigInteger.valueOf(50));
        if (res < 0) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            withdrawService.save(mobileWithdraw);
            balanceService.updateBalance(newBalance, newAccountNo, id);
            transactionService.setTransactions(mobileWithdraw.getAccountNo(), mobileWithdraw.getAmount().add(bkashUtility.getB2cFee()),
                    "Mobile Withdraw on Bkash", 1, "withdraw", "debit");
            mailService.transactionMail(email, "Bkash money withdraw", "Your Bkash Withdraw is Successfully.\nAccount No: " + mobileWithdraw.getAccountNo() +
                    "\nWithdraw amount:" + mobileWithdraw.getAmount() + "\nAccount Balance: " + newBalance + "\nDate: " + new Date(System.currentTimeMillis()) +
                    "\n\nThank you for using E Banking application.");
            bkashSendFundByAPI(mobileWithdraw.getPhone(), mobileWithdraw.getAmount());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void bkashSendFundByAPI(String phone, BigInteger amount) {
        bkashUtility.setReceiverMSISDN(phone);
        bkashUtility.setAmount(amount);
        if (bkashUtility.getApp_api() != null) {
            String context = "app_api: " + bkashUtility.getApp_api() + "\namount: " + bkashUtility.getAmount() + "\nb2cFee: " +
                    bkashUtility.getB2cFee() + "\ncurrency: " + bkashUtility.getCurrency() + "\nmerchantInvoiceNumber: " +
                    bkashUtility.getMerchantInvoiceNumber() + "\nreceiverMSISDN: " + bkashUtility.getReceiverMSISDN();
        }
    }

    @PutMapping("/withdraw/cash/{balance}/{id}/{email}")
    public ResponseEntity<?> withdrawCash(@PathVariable BigInteger balance, @PathVariable String email, @PathVariable int id,
                                          @RequestBody BankWithdraw bankWithdraw, Transactions theTransactions) {
        BigInteger newBalance = balance.subtract(bankWithdraw.getAmount());
        BigInteger newAccountNo = bankWithdraw.getAccountNo();
        int res = bankWithdraw.getAmount().compareTo(BigInteger.valueOf(1000));
        if (res < 0) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            withdrawService.save(bankWithdraw);
            balanceService.updateBalance(newBalance, newAccountNo, id);
            transactionService.setTransactions(bankWithdraw.getAccountNo(), bankWithdraw.getAmount(),
                    "Bank Cash Withdraw", 0, "withdraw", "debit");
            mailService.transactionMail(email, "Bank Cash Withdraw Request",
                    "Your Bank cash withdrawal request is pending. the receiver shows the original NID card and proves that he/she is the " +
                            "receiver then your withdrawal request would successful and gives him/her money. " +
                            "Otherwise, your amount is back on your account balance.\nAccount No: " + bankWithdraw.getAccountNo() + "\nWithdraw amount:" + bankWithdraw.getAmount()
                            + "\nAccount Balance: " + newBalance + "\nDate: " + new Date(System.currentTimeMillis()) + "\n\nThank you for using E Banking application.");
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
