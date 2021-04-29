package com.example.ebanking.service;

import java.math.BigInteger;
import java.util.List;

import com.example.ebanking.entity.Transactions;

public interface TransactionService {
    List<Transactions> getAllTransaction(BigInteger accountNo);
    public Transactions save(Transactions theTransactions);
    public void setTransactions(BigInteger accountNo, BigInteger amount, String description, int status, String type, String transactionType);
    public Transactions findTransactions(BigInteger accountNo, BigInteger amount);
    public void updateTransactions(Long id);
    public void denyTransactions(Long id);
}
