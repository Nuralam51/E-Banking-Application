package com.example.ebanking.service;

import com.example.ebanking.entity.Balance;
import com.example.ebanking.entity.BankWithdraw;
import com.example.ebanking.entity.MobileWithdraw;
import com.example.ebanking.repository.BankWithdrawRepository;
import com.example.ebanking.repository.MobileWithdrawRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;

@Service
@Transactional
public class WithdrawServiceImpl implements WithdrawService{

    @Autowired
    private MobileWithdrawRepository mobileWithdrawRepository;
    @Autowired
    private BankWithdrawRepository bankWithdrawRepository;

    @Override
    public MobileWithdraw save(MobileWithdraw mobileWithdraw) {
        return mobileWithdrawRepository.save(mobileWithdraw);
    }

    @Override
    public BankWithdraw save(BankWithdraw bankWithdraw) {
        return bankWithdrawRepository.save(bankWithdraw);
    }

    @Override
    public void updateWithdrawRequest(Long id) {
        bankWithdrawRepository.updateWithdrawRequest(id);
    }

    @Override
    public void denyWithdrawRequest(Long id) {
        bankWithdrawRepository.denyWithdrawRequest(id);
    }
}
