import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Balance } from 'src/app/common/balance';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import { ResetPasswordService } from '../../services/reset-password.service';
import { SettingsService } from '../../services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    user: Users = new Users();
    bankAccount: Bankaccount = new Bankaccount();
    balanceDetails: Balance = new Balance();

    currentUser: Users;
    currentUserDetails: Bankaccount;
    currentUserBalance: Balance;
    errorMessages: string;
    successMessages: string;

    constructor(private loginService: LoginService, private router: Router, private resetPasswordService: ResetPasswordService,
        private settingsService: SettingsService) {
        this.loginService.currentUser.subscribe(data => {
            this.currentUser = data;
            this.bankAccount.address = data.userDetails.address;
            this.currentUserDetails = data.userDetails;
            this.currentUserBalance = data.userDetails.balanceDetails;
        });
        this.user.email = this.currentUser.email;
    }

    ngOnInit(): void {
        document.getElementById("otp").style.display = "none";
        document.getElementById("changepassword").style.display = "none";
        document.getElementById("account").style.display = "none";
        document.getElementById("personal").style.display = "none";
        document.getElementById("security").style.display = "none";
        document.getElementById("verification").style.display = "none";
        this.ngAfterViewInit();
    }

    changePassword() {
        this.resetPasswordService.sendResetPasswordLink(this.user).subscribe(data => {
            this.successMessages = "Change password link send on your given email";
        }, err => {
            this.errorMessages = "Error";
            console.log(err);
        });
    }

    sendOtp() {
        this.settingsService.sendOtp(this.user).subscribe(data => {
            this.successMessages = "Activation code send on your email"
        }, err => {
            this.errorMessages = "error";
        });
        document.getElementById("otp").style.display = "block";
    }

    checkOTP() {
        this.settingsService.checkOTP(this.user).subscribe(data => {
            this.successMessages = "Account activation successfull";
            this.logout();
        }, err => {
            this.errorMessages = "OTP doesn't match!";
        });
    }

    deleteAccount(){
        this.settingsService.accountDelete().subscribe(data => {
            this.logout();
            this.router.navigate(['login']);
        }, err => {
            this.errorMessages = "error"
        });
    }

    logout() {
        this.loginService.logOut().subscribe(data => {
            this.router.navigate(['/login']);
        });
    }

    ngAfterViewInit() {
        Feather.replace();
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

    show(x) {
        if (x == 55) {
            document.getElementById("otp").style.display = "none";
        }
        if (x == 1) {
            document.getElementById("changepassword").style.display = "block";
        }
        if (x == 11) {
            document.getElementById("personal").style.display = "block";
        }
        if (x == 22) {
            document.getElementById("account").style.display = "block";
        }
        if (x == 33) {
            document.getElementById("security").style.display = "block";
        }
        if (x == 44) {
            document.getElementById("verification").style.display = "block";
        }
        if (x == 0) {
            document.getElementById("changepassword").style.display = "none";
        }
    }
}
