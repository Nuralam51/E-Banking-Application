package com.example.ebanking.entity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.sql.Date;

@Component
public class BkashUtility {

    @Value("${gson.app_api}")
    private String app_api;

    @Value("${gson.app_account}")
    private String merchantInvoiceNumber;

    @Value("${gson.app_key}")
    private String app_key;

    private BigInteger amount;

    @Value("${gson.currency}")
    private String currency;

    private BigInteger b2cFee = BigInteger.valueOf(5);

    private String receiverMSISDN;

    public String getApp_api() {
        return app_api;
    }

    public void setApp_api(String app_api) {
        this.app_api = app_api;
    }

    public String getMerchantInvoiceNumber() {
        return merchantInvoiceNumber;
    }

    public void setMerchantInvoiceNumber(String merchantInvoiceNumber) {
        this.merchantInvoiceNumber = merchantInvoiceNumber;
    }

    public String getApp_key() {
        return app_key;
    }

    public void setApp_key(String app_key) {
        this.app_key = app_key;
    }

    public BigInteger getAmount() {
        return amount;
    }

    public void setAmount(BigInteger amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigInteger getB2cFee() {
        return b2cFee;
    }

    public void setB2cFee(BigInteger b2cFee) {
        this.b2cFee = b2cFee;
    }

    public String getReceiverMSISDN() {
        return receiverMSISDN;
    }

    public void setReceiverMSISDN(String receiverMSISDN) {
        this.receiverMSISDN = receiverMSISDN;
    }
}
