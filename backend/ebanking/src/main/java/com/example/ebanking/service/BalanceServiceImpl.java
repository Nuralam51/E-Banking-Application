package com.example.ebanking.service;

import com.example.ebanking.entity.Balance;
import com.example.ebanking.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Service
@Transactional
public class BalanceServiceImpl implements BalanceService{

    @Autowired
    private BalanceRepository balanceRepository;

    @Override
    public void updateBalance(BigInteger newBalance, BigInteger newAccountNo, int id) {
        balanceRepository.updateBalance(newBalance, newAccountNo, id);
    }

    @Override
    public List<Balance> getBalanceStatus(BigInteger accountNo) {
        return balanceRepository.getBalanceStatus(accountNo);
    }

    @Override
    public Balance getBalance(BigInteger accountNo) {
        return balanceRepository.getBalance(accountNo);
    }

    @Override
    public Balance save(Balance theBalance) {
        return balanceRepository.save(theBalance);
    }

    @Override
    public void addBalance(BigInteger balance, BigInteger accountNo) {
        Balance theBalance = findByAccountNo(accountNo);
        BigInteger newBalance = theBalance.getBalance().add(balance);
        theBalance.setBalance(newBalance);
        balanceRepository.save(theBalance);
    }

    @Override
    public Balance findByAccountNo(BigInteger accountNo) {
        return balanceRepository.findByAccountNo(accountNo);
    }
}
