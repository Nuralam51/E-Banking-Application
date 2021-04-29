package com.example.ebanking.controller;

import java.math.BigInteger;
import java.sql.Date;
import java.util.List;
import java.util.Random;

import com.example.ebanking.entity.*;
import com.example.ebanking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private MailService mailService;
    @Autowired
    private UserService userService;
    @Autowired
    private WithdrawService withdrawService;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private BalanceService balanceService;
    @Autowired
    private BankAccountService bankAccountService;
    @Autowired
    private SendDepositService sendDepositService;

    @GetMapping("/user")
    public List<Users> getAllUsers() {
        return adminService.findAllUsers();
    }

    @GetMapping("/bankUser")
    public List<BankAccount> getAllBankUsers() {
        return adminService.findAllBankUsers();
    }

    @PostMapping("/bankUser/save")
    public ResponseEntity<?> saveBankUser(@RequestBody BankAccount theBankAccount) {
        BigInteger newAccountNo = generateBankAccountNo();
        BigInteger newOAccountNo = generateOnlineAccountNo();
        if(userService.findByAccountNo(newAccountNo) != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        if(userService.findByAccountNo(newOAccountNo) != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        theBankAccount.setAccountNo(newAccountNo);
        theBankAccount.setOAccountNo(newOAccountNo);
        theBankAccount.setStatus(1);
        theBankAccount.setOpeningDate(new Date(System.currentTimeMillis()));
        Balance theBalance = new Balance();
        theBalance.setAccountNo(newAccountNo);
        theBalance.setBalance(BigInteger.valueOf(0));
        theBalance.setLastUpdate(new Date(System.currentTimeMillis()));
        balanceService.save(theBalance);
        theBankAccount.setBalanceDetails(theBalance);
        bankAccountService.save(theBankAccount);
        return new ResponseEntity<>(theBankAccount, HttpStatus.OK);
    }

    @PostMapping("/balance/save")
    public ResponseEntity<?> saveBalance(@RequestBody Balance theBalance){
        if(bankAccountService.findByAccountNo(theBalance.getAccountNo()) == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        balanceService.addBalance(theBalance.getBalance(), theBalance.getAccountNo());
        sendDepositService.setDeposit(theBalance.getAccountNo(), null, null, theBalance.getBalance());
        transactionService.setTransactions(theBalance.getAccountNo(), theBalance.getBalance(), "Bank Cash Deposit",
                1, "deposit", "credit");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public BigInteger generateBankAccountNo() {
        BigInteger bigInteger = new BigInteger("2000000000000000");
        BigInteger min = new BigInteger("1000000000000000");
        BigInteger bigInteger1 = bigInteger.subtract(min);
        Random rnd = new Random();
        int maxNumBitLength = bigInteger.bitLength();
        BigInteger aRandomBigInt;
        aRandomBigInt = new BigInteger(maxNumBitLength, rnd);
        if (aRandomBigInt.compareTo(min) < 0)
            aRandomBigInt = aRandomBigInt.add(min);
        if (aRandomBigInt.compareTo(bigInteger) >= 0)
            aRandomBigInt = aRandomBigInt.mod(bigInteger1).add(min);
        return aRandomBigInt;
    }

    public BigInteger generateOnlineAccountNo() {
        BigInteger bigInteger = new BigInteger("2000000000000000");
        BigInteger min = new BigInteger("1000000000000000");
        BigInteger bigInteger1 = bigInteger.subtract(min);
        Random rnd = new Random();
        int maxNumBitLength = bigInteger.bitLength();
        BigInteger aRandomBigInt;
        aRandomBigInt = new BigInteger(maxNumBitLength, rnd);
        if (aRandomBigInt.compareTo(min) < 0)
            aRandomBigInt = aRandomBigInt.add(min);
        if (aRandomBigInt.compareTo(bigInteger) >= 0)
            aRandomBigInt = aRandomBigInt.mod(bigInteger1).add(min);
        return aRandomBigInt;
    }

    @GetMapping("/card/request")
    public List<CardAccount> getCardRequest() {
        return adminService.getCardRequest();
    }

    @PostMapping("/card/save/{id}/{accountNo}")
    public ResponseEntity<?> acceptCardRequest(@PathVariable BigInteger accountNo) {
        Users theUsers = userService.findByAccountNo(accountNo);
        adminService.updateCardRequest(accountNo);
        mailService.transactionMail(theUsers.getEmail(), "Accept Card Request", "Hello, " + theUsers.userDetails.getName()
                + "\n\nCongratulations! Your card request is accepted. Now you can use your card and also you can see your card information on bank website account.\n\nThank you.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/card/delete/{id}/{accountNo}")
    public ResponseEntity<?> refuseCardRequest(@PathVariable Long id, @PathVariable BigInteger accountNo) {
        Users theUsers = userService.findByAccountNo(accountNo);
        adminService.deleteCardRequest(id);
        mailService.transactionMail(theUsers.getEmail(), "Refuse Card Request", "Hello, " + theUsers.userDetails.getName()
                + "\n\nSorry! Your card request is refuse. Check your information and apply for card. \n\n Important: Information must be valid. \n\nThank you.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/withdraw/request")
    public List<BankWithdraw> getWithdrawRequest() {
        return adminService.getWithdrawRequest();
    }

    @PostMapping("/withdraw/save/{id}/{accountNo}/{amount}")
    public ResponseEntity<?> acceptWithdrawRequest(@PathVariable Long id, @PathVariable BigInteger accountNo, @PathVariable BigInteger amount) {
        Users theUsers = userService.findByAccountNo(accountNo);
        withdrawService.updateWithdrawRequest(id);
        Transactions theTransactions = transactionService.findTransactions(accountNo, amount);
        System.out.println(theTransactions.getId());
        transactionService.updateTransactions(theTransactions.getId());
        mailService.transactionMail(theUsers.getEmail(), "Bank Cash Withdraw Successfull.", "Hello, " + theUsers.userDetails.getName()
                + "\nCongratulations! Bank cash withdraw successful. Your receive got withdrawal money at" + System.currentTimeMillis() + ".\n\n Thank you");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/withdraw/delete/{id}/{accountNo}/{amount}")
    public ResponseEntity<?> denyWithdrawRequest(@PathVariable Long id, @PathVariable BigInteger accountNo, @PathVariable BigInteger amount) {
        Users theUsers = userService.findByAccountNo(accountNo);
        withdrawService.denyWithdrawRequest(id);
        Transactions theTransactions = transactionService.findTransactions(accountNo, amount);
        transactionService.denyTransactions(theTransactions.getId());
        Balance theBalance = balanceService.getBalance(accountNo);
        BigInteger newBalance = theBalance.getBalance().add(amount);
        balanceService.updateBalance(newBalance, theBalance.getAccountNo(), theBalance.getId());
        mailService.transactionMail(theUsers.getEmail(), "Bank Cash Withdraw Deny.", "Hello, " + theUsers.userDetails.getName()
                + "\nSorry! Your bank cash withdraw refuse.\n\n Thank you");
        return new ResponseEntity(HttpStatus.OK);
    }
}
