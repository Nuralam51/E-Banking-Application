package com.example.ebanking.entity;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public int id;

	@Column(name = "username")
	public String username;

	@Column(name = "accountno")
	public BigInteger accountNo;

	@Column(name = "email")
	public String email;

	@Column(name = "password")
	public String password;

	@Enumerated(EnumType.STRING)
	@Column(name="role")
	public Role role;
	
	@Column(name = "status")
	public int status;

	@Column(name = "createdate")
	public Date createdDate;

	@Column(name = "resetpasswordtoken")
	public String resetPasswordToken;

	@Column(name = "otp")
	public String otp;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "userdetails")
	public BankAccount userDetails;

	@Transient
	public String token;
	
}
