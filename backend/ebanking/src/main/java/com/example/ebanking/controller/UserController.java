package com.example.ebanking.controller;

import com.example.ebanking.entity.*;
import com.example.ebanking.service.*;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private BalanceService balanceService;
    @Autowired
    private MailService mailService;
    @Autowired
    private UserService userService;
    @Autowired
    PasswordEncoder passwordEncoded;

    @GetMapping("/balance/{accountNo}")
    public List<Balance> getBalance(@PathVariable BigInteger accountNo) {
        return balanceService.getBalanceStatus(accountNo);
    }

    @GetMapping("transaction/{accountNo}")
    public List<Transactions> getAllTransaction(@PathVariable BigInteger accountNo) {
        return transactionService.getAllTransaction(accountNo);
    }

    @PostMapping("/mail")
    public ResponseEntity<?> sendMail(@RequestBody Mail theMail) {
        mailService.send(theMail.from, theMail.to, theMail.subject, theMail.body, theMail.sentDate);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<?> sendForgetPassword(@RequestBody Users theUser) {
        if (userService.findByEmail(theUser.getEmail()) == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        String token = RandomString.make(30);
        userService.updateResetPasswordToken(token, theUser.getEmail());
        String resetPasswordLink = "http://localhost:4200/reset-password;token=" + token;
        mailService.sendMail(theUser.getEmail(), resetPasswordLink);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(@RequestBody Users theUser, @PathVariable String token) {
        Users users = userService.findByResetPasswordToken(token);
        if (users == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.updatePassword(theUser.getPassword(), token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
