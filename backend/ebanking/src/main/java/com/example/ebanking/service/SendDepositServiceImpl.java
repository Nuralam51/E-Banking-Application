package com.example.ebanking.service;

import com.example.ebanking.entity.Deposit;
import com.example.ebanking.entity.Send;
import com.example.ebanking.entity.Users;
import com.example.ebanking.repository.DepositRepository;
import com.example.ebanking.repository.SendRepository;
import com.example.ebanking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.sql.Date;

@Service
@Transactional
public class SendDepositServiceImpl implements SendDepositService{

    @Autowired
    private SendRepository sendRepository;
    @Autowired
    private DepositRepository depositRepository;

    @Override
    public Send save(Send theSend) {
        return sendRepository.save(theSend);
    }

    @Override
    public Deposit saveDeposit(Deposit theDeposit) {
        return depositRepository.save(theDeposit);
    }

    @Override
    public void setDeposit(BigInteger accountNo, BigInteger sendAccountNo, BigInteger receiveAccountNo, BigInteger amount) {
        Deposit theDeposit = new Deposit();
        theDeposit.setAccountNo(accountNo);
        theDeposit.setSendAccountNo(sendAccountNo);
        theDeposit.setReceiveAccountNo(receiveAccountNo);
        theDeposit.setAmount(amount);
        theDeposit.setStatus(1);
        theDeposit.setReceiveDate(new Date(System.currentTimeMillis()));
        depositRepository.save(theDeposit);
    }
}
