package com.example.ebanking.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.ebanking.entity.CardAccount;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;

public interface CardRepository extends JpaRepository<CardAccount, Long> {

	@Query(value = "select * from cardaccount where status='0'", nativeQuery = true)
	public List<CardAccount> getAllCardRequest();

	@Query(value = "select * from cardaccount where accountno = :accountNo", nativeQuery = true)
    public List<CardAccount> getCardStatus(BigInteger accountNo);

	@Transactional
	@Modifying
	@Query(value = "delete from cardaccount where id = :id", nativeQuery = true)
	public void deleteRequestById(@RequestParam("id") Long id);

	public CardAccount findByAccountNo(BigInteger accountNo);
}
