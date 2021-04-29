package com.example.ebanking.service;

import java.math.BigInteger;
import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ebanking.entity.Transactions;
import com.example.ebanking.repository.TransactionRepository;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService{

	@Autowired
	private TransactionRepository transactionRepository;
	
	@Override
	public List<Transactions> getAllTransaction(BigInteger accountNo) {
		return transactionRepository.findByTransaction(accountNo);
	}

	@Override
	public Transactions save(Transactions theTransactions) {
		return transactionRepository.save(theTransactions);
	}

	@Override
	public void setTransactions(BigInteger accountNo, BigInteger amount, String description, int status, String type, String transactionType) {
		Transactions theTransactions = new Transactions();
		theTransactions.setAccountNo(accountNo);
		theTransactions.setAmount(amount);
		theTransactions.setDescription(description);
		theTransactions.setStatus(status);
		theTransactions.setType(type);
		theTransactions.setDate(new Date(System.currentTimeMillis()));
		theTransactions.setTransactionType(transactionType);
		transactionRepository.save(theTransactions);
	}

	@Override
	public Transactions findTransactions(BigInteger accountNo, BigInteger amount) {
		return transactionRepository.findTransactions(accountNo, amount);
	}

	@Override
	public void updateTransactions(Long id) {
		transactionRepository.updateTransaction(id);
	}

	@Override
	public void denyTransactions(Long id) {
		transactionRepository.denyTransaction(id);
	}

}
