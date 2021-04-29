package com.example.ebanking.repository;

import java.math.BigInteger;
import java.util.List;

import com.example.ebanking.entity.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.ebanking.entity.Users;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long>{
	public Users findByEmail(String email);
	@Query(value = "select * from users where role = 'USER' and status = '1'", nativeQuery = true)
	public List<Users> findTotalUsers();

	@Query(value = "select users.*, bankaccount.name from users inner join bankaccount on " +
			"users.userdetails = bankaccount.id where bankaccount.accountno = :accountNo", nativeQuery = true)
    public Users findByAccountNo(@RequestParam("accountNo") BigInteger accountNo);

	public Users findByResetPasswordToken(String token);

    public Users findByotp(String otp);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM users WHERE email= :email", nativeQuery = true)
    void deleteUser(String email);
}
