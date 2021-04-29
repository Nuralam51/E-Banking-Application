package com.example.ebanking.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "send")
public class Send {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;

    @Column(name = "name")
    public String name;

    @Column(name = "accountno")
    public BigInteger accountNo;

    @Column(name = "saccountno")
    public BigInteger sendAccountNo;

    @Column(name = "raccountno")
    public BigInteger receiveAccountNo;

    @Column(name = "amount")
    public BigInteger amount;

    @Column(name = "sendingdate")
    public Date sendingDate;

    @Column(name = "status")
    public int status;
}
