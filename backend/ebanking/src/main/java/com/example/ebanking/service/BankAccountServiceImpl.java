package com.example.ebanking.service;

import java.math.BigInteger;
import java.util.List;

import com.example.ebanking.entity.CardAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ebanking.entity.BankAccount;
import com.example.ebanking.repository.BankAccountRepository;

@Service
public class BankAccountServiceImpl implements BankAccountService{

	@Autowired
	private BankAccountRepository bankAccountRepository;

	@Override
	public BankAccount findByAccountNo(BigInteger accountno) {
		return bankAccountRepository.findByAccountNo(accountno);
	}

	@Override
	public List<BankAccount> findAll(BigInteger accountNo) {
		return bankAccountRepository.findAll(accountNo);
	}

	@Override
	public BankAccount save(BankAccount theBankAccount) {
		return bankAccountRepository.save(theBankAccount);
	}

	@Override
	public void updateCardDetails(Long id, BigInteger accountNo) {
		bankAccountRepository.updateCardStatus(id, accountNo);
	}
}
