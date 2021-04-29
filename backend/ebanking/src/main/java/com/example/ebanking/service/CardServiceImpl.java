package com.example.ebanking.service;

import com.example.ebanking.entity.CardAccount;
import com.example.ebanking.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Transactional
@Service
public class CardServiceImpl implements CardService{

    @Autowired
    private CardRepository cardRepository;

    @Override
    public CardAccount save(CardAccount theCardAccount) {
        return cardRepository.save(theCardAccount);
    }

    @Override
    public List<CardAccount> getCardStatus(BigInteger accountNo) {
        return cardRepository.getCardStatus(accountNo);
    }

    @Override
    public CardAccount findByAccountNo(BigInteger accountNo) {
        return cardRepository.findByAccountNo(accountNo);
    }

}
