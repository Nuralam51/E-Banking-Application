package com.example.ebanking.controller;

import java.math.BigInteger;
import java.security.Principal;
import java.util.List;

import com.example.ebanking.service.MailService;
import net.bytebuddy.utility.RandomString;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.example.ebanking.entity.BankAccount;
import com.example.ebanking.entity.Role;
import com.example.ebanking.entity.Users;
import com.example.ebanking.jwt.JwtTokenProvider;
import com.example.ebanking.service.BankAccountService;
import com.example.ebanking.service.UserService;

@RestController
@RequestMapping("/user")
public class SecurityController {
	
	@Autowired
	public BankAccountService bankAccountService;
	@Autowired
	private UserService userService;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private MailService mailService;

	@GetMapping("/login")
	public ResponseEntity<?> login(Principal thePrincipal){
		if(thePrincipal == null) {
			return ResponseEntity.ok(thePrincipal);
		}
		UsernamePasswordAuthenticationToken authenticationToken = 
				(UsernamePasswordAuthenticationToken) thePrincipal;
		Users theUser = userService.findByEmail(authenticationToken.getName());
		theUser.setToken(jwtTokenProvider.generateToken(authenticationToken));
		return new ResponseEntity<>(theUser, HttpStatus.OK);
	}
	
	@PostMapping("/verify")
	public ResponseEntity<?> verifyAccount(@RequestBody BankAccount theBankAccount){
		if(bankAccountService.findByAccountNo(theBankAccount.getAccountNo()) == null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerAccount(@RequestBody Users theUser){
		if(userService.findByEmail(theUser.getEmail()) != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		BankAccount theBankAccount = bankAccountService.findByAccountNo(theUser.getAccountNo());
		String otp = RandomString.make(6);
		theUser.setOtp(otp);
		theUser.setRole(Role.USER);
		theUser.setStatus(0);
		theUser.setUserDetails(theBankAccount);
		userService.save(theUser);
		mailService.transactionMail(theUser.getEmail(), "Registration OTP code", "This is 6 digit otp code: " + otp + "\n\nThank you.");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/otp")
	public ResponseEntity<?> checkOTP(@RequestBody Users theUser){
		if(userService.findByOTP(theUser.getOtp()) == null){
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		userService.updateStatus(theUser.getOtp());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/account/otp")
	public ResponseEntity<?> sendOTP(@RequestBody Users theUser){
		if(userService.findByEmail(theUser.getEmail()) == null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		String otp = RandomString.make(6);
		userService.updateOtp(otp, theUser.getEmail());
		mailService.transactionMail(theUser.getEmail(), "Account activation code", "This is 6 digit activation code: " + otp + "\n\nThank you.");
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/account/delete/{email}")
	public ResponseEntity<?> deleteAccount(@PathVariable String email){
		if(userService.findByEmail(email) == null){
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		userService.deleteAccount(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
