import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankWithdraw } from 'src/app/common/bank-withdraw';
import { BankCashWithdrawService } from 'src/app/services/bank-cash-withdraw.service';
import * as Feather from 'feather-icons';
import { LoginService } from 'src/app/services/login.service';
import { BalanceService } from 'src/app/services/balance.service';
import { Users } from 'src/app/common/users';

@Component({
    selector: 'app-bankcash-withdraw',
    templateUrl: './bankcash-withdraw.component.html',
    styleUrls: ['./bankcash-withdraw.component.css']
})
export class BankcashWithdrawComponent implements OnInit {

    bankWithdraw: BankWithdraw = new BankWithdraw();
    errorMessage: string;
    successMessage: string;
    currentUserBalance: number = 0;
    currentUser: Users;
    disable = false;
    hidden: boolean;

    constructor(private router: Router, private loginService: LoginService,
        private bankCashWithdrawService: BankCashWithdrawService,
        private balanceService: BalanceService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.hidden = true;
        this.getBalanceStatus();
        this.ngAfterViewInit();
        this.loginService.currentUser.subscribe(data => {
            this.bankWithdraw.accountNo = data.userDetails.accountNo;
        });

        document.getElementById("banktocash").style.display = "none";
        document.getElementById("mobileoption").style.display = "none";
        document.getElementById("bkash").style.display = "none";
        document.getElementById("rocket").style.display = "none";
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

    sendCashMoney() {
        this.hidden = false;
        this.disable = true;
        this.bankCashWithdrawService.sendBankCash(this.bankWithdraw).subscribe(data => {
            this.successMessage = "Send Money Successfull";
            this.reloadPage();
            this.disable = false;
            this.hidden = true;
        }, err => {
            this.errorMessage = "Amount is must be equal or upto 1000 taka";
            this.disable = false;
            this.hidden = true;
        });
    }

    getBalanceStatus() {
        this.balanceService.getBalanceStatus().subscribe(data => {
            this.currentUserBalance = data;
            this.currentUserBalance =  this.currentUserBalance[0].balance - 500;
        });
    }
    show(x) {
        if (x == 0) {
            document.getElementById("bankcash").style.display = "block";
            document.getElementById("mobilebanking").style.display = "block";
            document.getElementById("banktocash").style.display = "none";
            document.getElementById("mobileoption").style.display = "none";
        }
        if (x == 1) {
            document.getElementById("bankcash").style.display = "none";
            document.getElementById("mobilebanking").style.display = "none";
            document.getElementById("banktocash").style.display = "block";
        }
        if (x == 11) {
            document.getElementById("banktocash").style.display = "none";
            document.getElementById("cashamount").style.display = "block";
            document.getElementById("confirmcash").style.display = "none";
        }
        if (x == 111) {
            document.getElementById("cashamount").style.display = "none";
            document.getElementById("confirmcash").style.display = "block";
        }
    }
}
