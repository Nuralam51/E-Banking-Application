package com.example.ebanking.repository;

import java.math.BigInteger;
import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.ebanking.entity.Transactions;

import javax.transaction.Transactional;

public interface TransactionRepository extends JpaRepository<Transactions, Long> {

    @Query(value = "select * from transactions where accountno = :accountNo ORDER BY date DESC", nativeQuery = true)
    public List<Transactions> findByTransaction(@RequestParam("accountNo") BigInteger accountNo);

    @Transactional
    @Modifying
    @Query(value = "update transactions set status = 1 where id = :id", nativeQuery = true)
    public void updateTransaction(Long id);

    @Query(value = "select * from transactions where accountno = :accountNo and amount= :amount and type='withdraw' and status = 0", nativeQuery = true)
    public Transactions findTransactions(BigInteger accountNo, BigInteger amount);

    @Transactional
    @Modifying
    @Query(value = "update transactions set status = -1 where id = :id", nativeQuery = true)
    public void denyTransaction(Long id);
}
