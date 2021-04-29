import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { Bankaccount } from '../../common/bankaccount';
import { Users } from '../../common/users';
import { RegisterService } from '../../services/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    headers: HttpHeaders;
    errorMessages: string;
    bankAccount = new Bankaccount();
    users = new Users();
    inputAccount: BigInteger;

    constructor(private http: HttpClient, private router: Router, private registerService: RegisterService) { }

    ngOnInit(): void {
        document.getElementById("checkAccount").style.display = "none";
    }

    verifyUser() {
        this.registerService.verify(this.bankAccount).subscribe(data => {
            this.inputAccount = this.bankAccount.accountNo;
            console.log(this.inputAccount)
            this.router.navigate(['register/info']);
        }, err => {
            this.errorMessages = "Wrong account no";
        })
    }

    show(x) {
        if (x == 1) {
            document.getElementById("conditions").style.display = "none";
            document.getElementById("checkAccount").style.display = "block";
        }
    }

}
