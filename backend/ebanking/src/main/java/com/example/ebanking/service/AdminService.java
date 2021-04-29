package com.example.ebanking.service;

import java.math.BigInteger;
import java.util.List;

import com.example.ebanking.entity.BankAccount;
import com.example.ebanking.entity.BankWithdraw;
import com.example.ebanking.entity.CardAccount;
import com.example.ebanking.entity.Users;
import org.springframework.http.ResponseEntity;

public interface AdminService {
	public List<Users> findAllUsers();
	public List<BankAccount> findAllBankUsers();
	
	public List<CardAccount> getCardRequest();
	public void updateCardRequest(BigInteger accountNo);
	public void deleteCardRequest(Long id);

	public List<BankWithdraw> getWithdrawRequest();
}
