import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Balance } from 'src/app/common/balance';
import { AdminAddBalanceService } from '../../../services/admin/admin-add-balance.service';

@Component({
    selector: 'app-admin-add-balance',
    templateUrl: './admin-add-balance.component.html',
    styleUrls: ['./admin-add-balance.component.css']
})
export class AdminAddBalanceComponent implements OnInit {

    balance: Balance = new Balance();
    successMessages: string;
    errorMessages: string;

    constructor(private router: Router, private adminAddBalance: AdminAddBalanceService) { }

    ngOnInit(): void {
        this.ngAfterViewInit();
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    save(){
        this.adminAddBalance.saveBalance(this.balance).subscribe(data => {
            this.successMessages = "Save amount successfull";
            this.reloadPage();
        }, err => {
            this.errorMessages = "Error";
            console.log(err);
        });
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
