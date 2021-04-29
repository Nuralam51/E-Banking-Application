package com.example.ebanking.service;

import java.math.BigInteger;
import java.util.List;

import com.example.ebanking.entity.BankAccount;
import com.example.ebanking.entity.CardAccount;

public interface BankAccountService {
	public BankAccount findByAccountNo(BigInteger accountno);
	List<BankAccount> findAll(BigInteger accountNo);
	public BankAccount save(BankAccount theBankAccount);
	public void updateCardDetails(Long id, BigInteger accountNo);
}
