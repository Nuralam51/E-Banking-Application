package com.example.ebanking.service;

import com.example.ebanking.entity.Users;

import java.math.BigInteger;

public interface UserService {
	public Users findByEmail(String email);
	public Users save(Users theUser);
	public Users findByAccountNo(BigInteger accountNo);
	public Users findByResetPasswordToken(String token);
	public void updateResetPasswordToken(String token, String email);
	public void updatePassword(String password, String token);
	public Users findByOTP(String otp);
	public void updateStatus(String otp);
	void updateOtp(String otp, String email);
	void deleteAccount(String email);
}
