package com.example.ebanking.service;

import com.example.ebanking.entity.CardAccount;

import java.math.BigInteger;
import java.util.List;

public interface CardService {
    public CardAccount save(CardAccount theCardAccount);
    public List<CardAccount> getCardStatus(BigInteger accountNo);
    public CardAccount findByAccountNo(BigInteger accountNo);
}
