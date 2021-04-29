import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Users } from 'src/app/common/users';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

    user: Users = new Users();
    errorMessages: string;
    successMessages: string;
    disable = false;

    constructor(private router: Router, private forgetPasswordService: ForgetPasswordService) { }

    ngOnInit(): void {
        this.ngAfterViewInit();
    }

    changePassword() {
        this.disable = true;
        this.forgetPasswordService.sendResetPasswordLink(this.user).subscribe(data => {
            this.successMessages = "Change password link send on your given email";
            this.disable = false;
            this.router.navigate(['/login']);
        }, err => {
            this.errorMessages = "Email is wrong!";
            console.log(err);
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
