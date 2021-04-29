package com.example.ebanking.service;

import com.example.ebanking.entity.Deposit;
import com.example.ebanking.entity.Send;

import java.math.BigInteger;

public interface SendDepositService {
    public Send save(Send theSend);
    public Deposit saveDeposit(Deposit theDeposit);
    public void setDeposit(BigInteger accountNo, BigInteger sendAccountNo, BigInteger receiveAccountNo, BigInteger amount);
}
