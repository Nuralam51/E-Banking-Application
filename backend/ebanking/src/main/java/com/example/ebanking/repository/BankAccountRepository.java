package com.example.ebanking.repository;

import java.math.BigInteger;
import java.util.List;

import com.example.ebanking.entity.CardAccount;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ebanking.entity.BankAccount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;

@Repository
@EnableJpaRepositories
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
	public BankAccount findByAccountNo(BigInteger accountno);

	@Query(value = "select * from bankaccount where accountno = :accountNo", nativeQuery = true)
	List<BankAccount> findAll(BigInteger accountNo);

	@Transactional
	@Modifying
	@Query(value = "update bankaccount set carddetails= :id where accountno = :accountNo", nativeQuery = true)
	public void updateCardStatus(Long id, BigInteger accountNo);
}