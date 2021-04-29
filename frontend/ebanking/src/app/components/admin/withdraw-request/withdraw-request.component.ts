import { Component, OnInit } from '@angular/core';
import { AdminWithdrawService } from '../../../services/admin-withdraw.service';
import { BankWithdraw } from '../../../common/bank-withdraw';

import * as Feather from 'feather-icons';
import { Router } from '@angular/router';
import { Mobilewithdraw } from 'src/app/common/mobilewithdraw';

@Component({
    selector: 'app-withdraw-request',
    templateUrl: './withdraw-request.component.html',
    styleUrls: ['./withdraw-request.component.css']
})
export class WithdrawRequestComponent implements OnInit {

    requestList: Array<BankWithdraw>;
    bankWithdraw: BankWithdraw = new BankWithdraw();
    errorMessages: string;
    successMessages: string;
    UserId: number;
    UserAcc: BigInteger;
    userAmount: number;

    constructor(private router: Router, private adminWithdrawService: AdminWithdrawService) { }

    ngOnInit(): void {
        this.getWithdrawRequest();
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    forAccept(id: number, accountNo: BigInteger, amount: number) {
        this.UserId = id;
        this.UserAcc = accountNo;
        this.userAmount = amount;
    }
    
    forDelete(id: number, accountNo: BigInteger, amount: number){
        this.UserId = id;
        this.UserAcc = accountNo;
        this.userAmount = amount;
    }

    getWithdrawRequest() {
        this.adminWithdrawService.getWithdrawRequest().subscribe(data => {
            this.requestList = data;
        });
    }

    acceptBankWithdrawRequest(UserId: number, UserAcc: BigInteger, userAmount: number){
        this.adminWithdrawService.acceptBankWithdrawRequest(UserId, UserAcc, userAmount).subscribe(data => {
            this.successMessages = "Success";
            this.reloadPage();
        });
    }

    denyBankWithdrawRequest(UserId: number, UserAcc: BigInteger, userAmount: number){
        this.adminWithdrawService.denyBankWithdrawRequest(UserId, UserAcc, userAmount).subscribe(data => {
            this.successMessages = "Success";
            this.reloadPage();
        })
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

    onOpenModal(mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-bs-toggle', 'modal');
        if (mode === 'accept') {
            button.setAttribute('data-bs-target', '#acceptModal');
        }
        if (mode === 'refuse') {
            button.setAttribute('data-bs-target', '#refuseModal');
        }
        container.appendChild(button);
        button.click();
    }
}
