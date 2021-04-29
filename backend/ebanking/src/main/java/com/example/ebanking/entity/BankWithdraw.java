package com.example.ebanking.entity;

import java.math.BigInteger;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "bankwithdraw")
@Getter
@Setter
public class BankWithdraw {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public Long id;

	@Column(name = "accountno")
	public BigInteger accountNo;

	@Column(name = "receivername")
	public String receiverName;

	@Column(name = "receivernid")
	public String receiverNID;

	@Column(name = "receivermobile")
	public String receiverPhone;

	@Column(name = "amount")
	public BigInteger amount;

	@Column(name = "type")
	public String type;

	@Column(name = "withdrawdate")
	@UpdateTimestamp
	public Date withdrawDate;

	@Column(name = "status")
	public int status;
	
}
