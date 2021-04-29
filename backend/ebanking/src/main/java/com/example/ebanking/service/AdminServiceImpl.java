package com.example.ebanking.service;

import java.math.BigInteger;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ebanking.entity.BankAccount;
import com.example.ebanking.entity.BankWithdraw;
import com.example.ebanking.entity.CardAccount;
import com.example.ebanking.entity.Users;
import com.example.ebanking.repository.BankAccountRepository;
import com.example.ebanking.repository.BankWithdrawRepository;
import com.example.ebanking.repository.CardRepository;
import com.example.ebanking.repository.UserRepository;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BankAccountRepository bankAccountRepository;
	@Autowired
	private CardRepository cardRepository;
	@Autowired
	private BankWithdrawRepository bankWithdrawRepository;
	
	@Override
	public List<BankAccount> findAllBankUsers() {
		return bankAccountRepository.findAll();
	}
	
	@Override
	public List<Users> findAllUsers() {
		return userRepository.findTotalUsers();
	}
	
	public List<CardAccount> getCardRequest(){
		return cardRepository.getAllCardRequest();
	}

	@Override
	public void updateCardRequest(BigInteger accountNo) {
		CardAccount theCardAccount = cardRepository.findByAccountNo(accountNo);
		theCardAccount.setStatus(1);
		cardRepository.save(theCardAccount);
	}

	@Override
	public List<BankWithdraw> getWithdrawRequest() {
		return bankWithdrawRepository.getAllWithdrawRequest();
	}

	@Override
	public void deleteCardRequest(Long id) {
		cardRepository.deleteRequestById(id);
	}

}
