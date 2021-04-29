import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Users } from 'src/app/common/users';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    user: Users = new Users();
    errorMessages: string;
    successMessages: string;
    token: string;

    constructor(private router: Router, private activateRouter: ActivatedRoute, private forgetPasswordService: ForgetPasswordService) { }

    ngOnInit(): void {
        this.ngAfterViewInit();
    }

    resetPassword() {
        const hasToken: boolean = this.activateRouter.snapshot.paramMap.has('token');
        if(hasToken){
            this.token = this.activateRouter.snapshot.paramMap.get('token');
        }
        this.forgetPasswordService.sendForgetPassword(this.user, this.token).subscribe(data => {
            this.successMessages = "Password change successfull";
            this.router.navigate(['/login']);
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
