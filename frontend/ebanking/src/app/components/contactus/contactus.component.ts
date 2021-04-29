import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import { Mail } from '../../common/mail';
import { ContactUsService } from '../../services/contact-us.service';

@Component({
    selector: 'app-contactus',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

    mail: Mail = new Mail();
    errorMessage: string;
    successMessage: string;
    userValue: string;

    constructor(private router: Router, private contactUsService: ContactUsService, private loginService: LoginService) { }

    ngOnInit(): void {
        this.mail.from = this.loginService.currentUserValue.email;
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    sendMail() {
        this.contactUsService.sendMail(this.mail).subscribe(data => {
            this.successMessage = "Mail send succesfully";
            this.reloadPage();
        }, err => {
            this.errorMessage = "Mail send error";
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
