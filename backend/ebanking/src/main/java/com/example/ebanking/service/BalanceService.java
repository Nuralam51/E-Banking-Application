package com.example.ebanking.service;

import com.example.ebanking.entity.Balance;

import java.math.BigInteger;
import java.util.List;

public interface BalanceService {
    public void updateBalance(BigInteger newBalance, BigInteger newAccountNo, int id);
    List<Balance> getBalanceStatus(BigInteger accountNo);
    public Balance getBalance(BigInteger accountNo);
    public Balance save(Balance theBalance);
    public void addBalance(BigInteger balance, BigInteger accountNo);
    public Balance findByAccountNo(BigInteger accountNo);
}
