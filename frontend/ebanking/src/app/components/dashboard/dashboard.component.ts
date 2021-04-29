import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Balance } from 'src/app/common/balance';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import * as Feather from 'feather-icons';
import { TransactionService } from 'src/app/services/transaction.service';
import { BalanceService } from 'src/app/services/balance.service';
import { Transaction } from 'src/app/common/transaction';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: Users = new Users();
    userDetails: Bankaccount = new Bankaccount();
    balanceDetails: Balance = new Balance();

    currentUser: Users;
    currentUserDetails: Bankaccount;

    currentUserBalance: number;
    transactionList: Array<Transaction>;
    transactionLimit: Array<Transaction>;

    constructor(private router: Router, private loginService: LoginService,
                private transactionService: TransactionService,
                private balanceService: BalanceService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.getBalanceStatus();
        this.getTransactionList();
        this.ngAfterViewInit();
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
            this.currentUserDetails = data.userDetails;
        });
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    getBalanceStatus() {
        this.balanceService.getBalanceStatus().subscribe(data => {
            this.currentUserBalance = data;
            this.balanceDetails = this.currentUserBalance[0].balance;
        });
    }

    getTransactionList() {
        this.transactionService.getAllTransactions().subscribe(data => {
            this.transactionList = data;
        })
    }
}
