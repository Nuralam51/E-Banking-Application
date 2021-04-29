package com.example.ebanking.service;

import com.example.ebanking.entity.BankWithdraw;
import com.example.ebanking.entity.MobileWithdraw;

import java.math.BigInteger;

public interface WithdrawService {
    public MobileWithdraw save(MobileWithdraw mobileWithdraw);
    public BankWithdraw save(BankWithdraw bankWithdraw);
    public void updateWithdrawRequest(Long id);
    public void denyWithdrawRequest(Long id);
}
