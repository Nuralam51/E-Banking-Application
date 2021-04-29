package com.example.ebanking.entity;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Getter
@Setter
@Table(name = "cardaccount")
public class CardAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public Long id;

	@Column(name = "name")
	public String name;

	@Column(name = "accountno")
	public BigInteger accountNo;

	@Column(name = "nid")
	public String nid;

	@Column(name = "cardno")
	public char[] cardNo;

	@Column(name = "carddate")
	public String cardDate;
	
	@Column(name = "cardpin")
	public char[] cardPin;
	
	@Column(name = "type")
	public String type;

	@Column(name = "status")
	public int status;
	
	@Column(name = "datetime")
	@CreatedDate
	public Date createDate; 
}
