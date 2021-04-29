import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import { SendService } from '../../services/sendDeposit/send.service';
import { Send } from '../../common/send';
import { Balance } from 'src/app/common/balance';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

    bankAccount: Bankaccount = new Bankaccount();
    balance: Balance = new Balance();
    currentUser: Users;
    send: Send = new Send()
    errorMessage: string;
    successMessage: string;
    currentUserBalance: number = 0;
    disable = false;
    hidden: boolean;

    constructor(private router: Router, private loginService: LoginService,
        private sendService: SendService,
        private balanceService: BalanceService) { }

    ngOnInit(): void {
        this.hidden = true;
        this.getBalanceStatus();
        this.ngAfterViewInit();
        this.loginService.currentUser.subscribe(data => {
            this.send.accountNo = data.userDetails.accountNo;
            this.send.sendAccountNo = data.userDetails.accountNo;
            this.send.name = data.userDetails.name;
        })
        document.getElementById("accountno").style.display = "none";
    }
    // send method
    sendMoney() {
        this.hidden = false;
        this.disable = true;
        this.sendService.sendMoney(this.send).subscribe(data => {
            console.log(data)
            this.successMessage = "Send Money Successfull";
            this.reloadPage();
            this.disable = false;
            this.hidden = true;
        }, err => {
            console.log(err)
            this.errorMessage = "Bank Account number is wrong! Or Amount is must be equal or upto 1000 taka!";
            this.disable = false;
            this.hidden = true;
        });
    }

    ngAfterViewInit() {
        Feather.replace();
    }
    // reload page
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
    getBalanceStatus() {
        this.balanceService.getBalanceStatus().subscribe(data => {
            this.currentUserBalance = data;
            this.currentUserBalance =  this.currentUserBalance[0].balance - 500;
        });
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
    // show hide
    show(x) {
        if (x == 0) {
            document.getElementById("banktobank").style.display = "block";
            document.getElementById("accountno").style.display = "none";
        }
        if (x == 1) {
            document.getElementById("accountno").style.display = "block";
            document.getElementById("banktobank").style.display = "none";
        }
    }
}
