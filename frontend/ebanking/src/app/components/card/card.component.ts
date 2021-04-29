import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bankaccount } from 'src/app/common/bankaccount';
import { CardAccount } from 'src/app/common/card-account';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import { CardService } from '../../services/card.service';
import * as Feather from 'feather-icons';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';

let shoppingCard = "http://localhost:8080/user/card/";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    user: Users = new Users;
    cardAccount: CardAccount = new CardAccount();
    currentUser: Users;
    currentUserDetails: Bankaccount;
    cardDetails: any;
    errorMessages: string;
    successMessages: string;
    cardStatus: any;
    disabled = false;

    constructor(private loginService: LoginService, private router: Router, private cardService: CardService) {
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
            this.currentUserDetails = data.userDetails;
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.cardAccount.type = "Shopping Card";
        this.cardAccount.accountNo = this.currentUser.userDetails.accountNo;
        document.getElementById("physicalform").style.display = "none";
        this.getCardStatus();
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    shoppingCard() {
        this.cardService.sendCardRequest(this.cardAccount).subscribe(data => {
            console.log(this.cardAccount)
            this.successMessages = "Card request successfull";
            this.reloadPage()
        }, err => {
            this.errorMessages = "error";
            console.log(err)
        });
    }

    getCardStatus() {
        this.cardService.getCardStatus().subscribe(data => {
            this.cardDetails = data;
            if (this.cardDetails.length != 0) {
                this.cardStatus = this.cardDetails[0].status;
            }
            else {
                this.cardStatus = null;
            }
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
            document.getElementById("physicalcard").style.display = "block";
        }
        if (x == 1) {
            document.getElementById("physicalform").style.display = "block";
            document.getElementById("physicalcard").style.display = "none";
        }
    }
}
