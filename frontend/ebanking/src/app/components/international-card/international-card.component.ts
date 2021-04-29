import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bankaccount } from 'src/app/common/bankaccount';
import { CardAccount } from 'src/app/common/card-account';
import { Users } from 'src/app/common/users';
import { CardService } from 'src/app/services/card.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-international-card',
    templateUrl: './international-card.component.html',
    styleUrls: ['./international-card.component.css']
})
export class InternationalCardComponent implements OnInit {

    cardAccount: CardAccount = new CardAccount();
    currentUser: Users;
    currentUserDetails: Bankaccount;
    errorMessages: string;
    successMessages: string;

    constructor(private loginService: LoginService, private router: Router, private cardService: CardService) {
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
            this.currentUserDetails = data.userDetails;
        });
    }

    ngOnInit(): void {
        this.cardAccount.type = "International Card";
        this.cardAccount.accountNo = this.currentUser.userDetails.accountNo;
    }

    internationalCard(){
        this.cardService.sendCardRequest(this.cardAccount).subscribe(data => {
            this.successMessages = "Card request successfull";
            this.reloadPage();
        }, err => {
            this.errorMessages = "error";
        });
    }

    // input number field
    isInputNumber(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            this.errorMessages = "Only number is allow!"
            return false;
        }
        return true;
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
    showform(x) {
        if (x == 0) {
            document.getElementById("physicalform").style.display = "none";
            document.getElementById("interform").style.display = "none";
            document.getElementById("physicalcard").style.display = "block";
            document.getElementById("intercard").style.display = "block";
        }
        if (x == 2) {
            document.getElementById("interform").style.display = "block";
            document.getElementById("physicalcard").style.display = "none";
            document.getElementById("intercard").style.display = "none";
        }
    }

}
