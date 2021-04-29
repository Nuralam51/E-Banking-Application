import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Observable } from 'rxjs';
import { Balance } from 'src/app/common/balance';
import { BankWithdraw } from 'src/app/common/bank-withdraw';
import { Transaction } from 'src/app/common/transaction';
import { Users } from 'src/app/common/users';
import { BalanceService } from 'src/app/services/balance.service';
import { LoginService } from 'src/app/services/login.service';
import { Mobilewithdraw } from '../../common/mobilewithdraw';
import { MobileWithdrawService } from '../../services/mobile-withdraw.service';

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

    mobileWithdraw: Mobilewithdraw = new Mobilewithdraw();
    bankWithdraw: BankWithdraw = new BankWithdraw();
    transaction: Transaction = new Transaction();
    balance: Balance = new Balance();
    currentUser: Users;
    errorMessage: string;
    successMessage: string;
    currentUserBalance: number = 0;
    disable = false;
    hidden: boolean = true;

    constructor(private router: Router, private loginService: LoginService,
        private mobileWithdrawService: MobileWithdrawService,
        private balanceService: BalanceService) { }

    ngOnInit(): void {
        this.hidden = true;
        this.getBalanceStatus();
        this.loginService.currentUser.subscribe(data => {
            this.mobileWithdraw.accountNo = data.userDetails.accountNo;
        });
        document.getElementById("mobileoption").style.display = "none";
        document.getElementById("bkash").style.display = "none";
        document.getElementById("rocket").style.display = "none";
        document.getElementById("banktocash").style.display = "none";
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    // input number field
    isInputNumber(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            this.errorMessage = "Only number is allow!"
            return false;
        }
        return true;
    }
    reloadPage() {
        var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
        var now = Date.now();
        var tenSec = 10 * 1000;
        var plusTenSec = currentDocumentTimestamp + tenSec;
        if (now > plusTenSec) {
            location.reload();
        }
        else {
            location.reload();
        }
    }

    // get balance
    getBalanceStatus() {
        this.balanceService.getBalanceStatus().subscribe(data => {
            this.currentUserBalance = data;
            this.currentUserBalance =  this.currentUserBalance[0].balance - 500;
        });
    }
    // mobile banking
    sendMoneyBkash() {
        this.hidden = false;
        this.disable = true;
        this.mobileWithdrawService.sendMoneyBkash(this.mobileWithdraw).subscribe(data => {
            this.successMessage = "Mobile withdraw Successfull. Just wait for 2-5 minutes!";
            this.reloadPage();
            this.disable = false;
            this.hidden = true;
        }, err => {
            this.errorMessage = "Amount is must be equal or upto 50 taka";
            this.disable = false;
            this.hidden = true;
        });
    }

    show(x) {
        if (x == 0) {
            document.getElementById("mobileoption").style.display = "none";
            document.getElementById("bankcash").style.display = "block";
            document.getElementById("mobilebanking").style.display = "block";
            document.getElementById("banktocash").style.display = "none";
        }
        if (x == 2) {
            document.getElementById("bankcash").style.display = "none";
            document.getElementById("mobilebanking").style.display = "none";
            document.getElementById("mobileoption").style.display = "block";
            document.getElementById("bkash").style.display = "none";
            document.getElementById("rocket").style.display = "none";
        }
        if (x == 21) {
            document.getElementById("mobileoption").style.display = "none";
            document.getElementById("bkash").style.display = "block";
        }
        if (x == 211) {
            document.getElementById("bkash").style.display = "none";
        }
        if (x == 22) {
            document.getElementById("mobileoption").style.display = "none";
            document.getElementById("rocket").style.display = "block";
        }
        if (x == 222) {
            document.getElementById("rocket").style.display = "none";
        }
    }

}
