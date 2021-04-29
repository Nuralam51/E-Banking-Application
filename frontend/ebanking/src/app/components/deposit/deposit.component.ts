import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

    user: Users = new Users();

    currentUser: Users;
    currentUserDetails: Bankaccount;

    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
            this.currentUserDetails = data.userDetails;
        });
    }

    ngOnInit(): void {
        document.getElementById("transfer").style.display = "none";
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    show(x) {
        if (x == 0) {
            document.getElementById("transfer").style.display = "none";
            document.getElementById("banktransfer").style.display = "block";
        }
        if (x == 1) {
            document.getElementById("transfer").style.display = "block";
            document.getElementById("banktransfer").style.display = "none";
        }
    }

}
