import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Balance } from 'src/app/common/balance';
import { Bankaccount } from 'src/app/common/bankaccount';
import { AdminAddBankService } from '../../../services/admin/admin-add-bank.service';

@Component({
    selector: 'app-admin-add-bank',
    templateUrl: './admin-add-bank.component.html',
    styleUrls: ['./admin-add-bank.component.css']
})
export class AdminAddBankComponent implements OnInit {

    bankAccount: Bankaccount = new Bankaccount();
    balance: Balance = new Balance();
    successMessages: string;
    errorMessages: string;

    constructor(private router: Router, private adminAddBankService: AdminAddBankService) { }

    ngOnInit(): void {
        this.ngAfterViewInit()
    }

    save() {
        this.adminAddBankService.saveAccount(this.bankAccount).subscribe(data => {
            this.successMessages = "User account is saved"
            this.reloadPage();
        }, err => {
            this.errorMessages = "Error";
        });
    }

    ngAfterViewInit() {
        Feather.replace();
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

}
