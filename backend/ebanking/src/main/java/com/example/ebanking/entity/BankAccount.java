package com.example.ebanking.entity;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "bankaccount")
public class BankAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public int id;
	
	@Column(name = "name")
	public String name;

	@Column(name = "accountno")
	public BigInteger accountNo;

	@Column(name = "oaccountno")
	public BigInteger oAccountNo;

	@Column(name = "phone")
	public String phone;

	@Column(name = "birthdate")
	public Date dateOfBirth;

	@Column(name = "status")
	public int status;

	@Column(name = "nid")
	public String nid;

	@Column(name = "address")
	public String address;

	@Column(name = "openingdate")
    @CreationTimestamp
	public Date openingDate;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="balancedetails")
	public Balance balanceDetails;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "carddetails")
	public CardAccount cardDetails;
	
}
