package com.example.ebanking.controller;

import com.example.ebanking.entity.BankAccount;
import com.example.ebanking.entity.CardAccount;
import com.example.ebanking.entity.Users;
import com.example.ebanking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/user")
public class CardController {

    @Autowired
    private MailService mailService;
    @Autowired
    private CardService cardService;
    @Autowired
    private UserService userService;
    @Autowired
    private BankAccountService bankAccountService;

    @GetMapping("/card/status/{accountNo}")
    public List<CardAccount> getCardStatus(@PathVariable BigInteger accountNo){
        return cardService.getCardStatus(accountNo);
    }

    @PostMapping("/card/{email}")
    public ResponseEntity<?> cardRequest(@PathVariable String email, @RequestBody CardAccount theCardAccount) throws ParseException {
        /* generate card number, pin, date */
        char[] cardNumber = new char[16];
        char[] cardPIN = new char[3];
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        generateCardNumber(cardNumber);
        generateCardPIN(cardPIN);
        generateDate(calendar);
        /* save card */
        theCardAccount.setCardNo(cardNumber);
        theCardAccount.setCardPin(cardPIN);
        theCardAccount.setCardDate(simpleDateFormat.format(calendar.getTime()));
        theCardAccount.setStatus(0);
        theCardAccount.setCreateDate(new Date(System.currentTimeMillis()));
        cardService.save(theCardAccount);
        bankAccountService.updateCardDetails(theCardAccount.getId(), theCardAccount.getAccountNo());
        /* send mail */
        Users theUsers = userService.findByAccountNo(theCardAccount.getAccountNo());
        mailService.transactionMail(email, "Request for create a " + theCardAccount.getType(),
                "Hello, " + theUsers.userDetails.getName() + ".\n\nYou have requested a visa card under this " + theCardAccount.getAccountNo() +
                        " account no.\nWe will check your information. When your card is ready, we will inform you to receive your card. " +
                        "I hope your card will ready within 7-10 business days. \n\nThank you for using our card service.");
        return new ResponseEntity(HttpStatus.OK);
    }

    public void generateCardNumber(char[] cardNumber) {
        Random random = new Random();
        cardNumber[0] = (char) (random.nextInt(9) + '1');
        for (int i = 1; i < 16; i++) {
            cardNumber[i] = (char) (random.nextInt(10) + '0');
        }
    }

    public void generateCardPIN(char[] cardPIN) {
        Random random = new Random();
        cardPIN[0] = (char) (random.nextInt(9) + '1');
        for (int i = 1; i < 3; i++) {
            cardPIN[i] = (char) (random.nextInt(10) + '0');
        }
    }

    public void generateDate(Calendar calendar) throws ParseException {
        LocalDateTime now = LocalDateTime.now();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        calendar.setTime(simpleDateFormat.parse(String.valueOf(now)));
        calendar.add(Calendar.DATE, 800);
    }
}
