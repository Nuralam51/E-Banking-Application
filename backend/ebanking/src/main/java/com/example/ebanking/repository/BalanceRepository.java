package com.example.ebanking.repository;

import com.example.ebanking.entity.Balance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

public interface BalanceRepository extends JpaRepository<Balance, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE balance b SET b.balance=?1, b.accountno=?2, b.lastupdate=current_timestamp() WHERE b.id = ?3", nativeQuery = true)
    public void updateBalance(BigInteger newBalance, BigInteger newAccountNo, int id);

    @Query(value = "select * from balance where accountno = :accountNo", nativeQuery = true)
    List<Balance> getBalanceStatus(@RequestParam("accountNo") BigInteger accountNo);

    @Transactional
    @Modifying
    @Query(value = "UPDATE balance b SET b.balance=?1, b.lastupdate=current_timestamp() WHERE b.accountno = ?2", nativeQuery = true)
    public void addBalance(BigInteger newBalance, BigInteger newAccountNo);

    @Query(value = "select * from balance where accountno = :accountNo", nativeQuery = true)
    public Balance getBalance(@RequestParam("accountNo") BigInteger accountNo);

    Balance findByAccountNo(BigInteger accountNo);
}
