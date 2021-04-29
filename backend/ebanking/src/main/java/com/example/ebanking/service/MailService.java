package com.example.ebanking.service;

import java.math.BigInteger;
import java.util.Date;

public interface MailService {
    public void send(String from, String to, String subject, String body, Date theDate);
    public void transactionMail(String to, String subject, String body);
    public void sendMail(String email, String link);
}
