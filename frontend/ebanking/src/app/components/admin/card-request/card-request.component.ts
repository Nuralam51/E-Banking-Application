import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { CardAccount } from 'src/app/common/card-account';
import { AdminCardService } from '../../../services/admin/admin-card.service';

@Component({
    selector: 'app-card-request',
    templateUrl: './card-request.component.html',
    styleUrls: ['./card-request.component.css']
})
export class CardRequestComponent implements OnInit {

    cardRequestList: Array<CardAccount>;
    cardAccount: CardAccount = new CardAccount();
    errorMessages: string;
    successMessages: string;
    cardUserId: number;
    cardUserAcc: BigInteger;

    constructor(private router: Router, private adminCardService: AdminCardService) { }

    ngOnInit(): void {
        this.getCardRequest();
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    setData(id: number, accountNo: BigInteger) {
        this.cardUserId = id;
        this.cardUserAcc = accountNo;
    }

    acceptCardRequest(id: number, cardUserAcc: BigInteger) {
        this.adminCardService.saveCardRequest(id, cardUserAcc).subscribe(data => {
            this.successMessages = "Card request is accepted";
            this.reloadPage();
        });
    }

    refuse(id: number, cardUserAcc: BigInteger){
        this.adminCardService.deleteCardRequest(id, cardUserAcc).subscribe(data => {
            this.successMessages = "Card request is deny";
            this.reloadPage();
        }, err => {
            this.errorMessages = "Error";
            console.log(err)
        });
    }

    getCardRequest() {
        this.adminCardService.getCardRequest().subscribe(data => {
            this.cardRequestList = data;
        });
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
