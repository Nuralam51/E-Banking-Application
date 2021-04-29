package com.example.ebanking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.ebanking.entity.BankWithdraw;

import javax.transaction.Transactional;

public interface BankWithdrawRepository extends JpaRepository<BankWithdraw, Long>{

	@Query(value = "select * from bankwithdraw where status='0'", nativeQuery = true)
	public List<BankWithdraw> getAllWithdrawRequest();

	@Transactional
	@Modifying
	@Query(value = "update bankwithdraw set status = 1 where id = :id", nativeQuery = true)
    public void updateWithdrawRequest(Long id);

	@Transactional
	@Modifying
	@Query(value = "update bankwithdraw set status = -1 where id = :id", nativeQuery = true)
	public  void denyWithdrawRequest(Long id);
}
