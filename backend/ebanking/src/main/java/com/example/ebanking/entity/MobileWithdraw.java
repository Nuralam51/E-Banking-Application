package com.example.ebanking.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "mobilewithdraw")
public class MobileWithdraw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long id;

    @Column(name = "accountno")
    public BigInteger accountNo;

    @Column(name = "type")
    public String type;

    @Column(name = "withdrawtype")
    public String withdrawType;

    @Column(name = "phone")
    public String phone;

    @Column(name = "amount")
    public BigInteger amount;

    @Column(name = "datetime")
    @CreatedDate
    public Date dateTime;
}
