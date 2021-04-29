import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { RegisterService } from 'src/app/services/register.service';

@Component({
    selector: 'app-register-otp',
    templateUrl: './register-otp.component.html',
    styleUrls: ['./register-otp.component.css']
})
export class RegisterOtpComponent implements OnInit {

    errorMessages: string;
    successMessages: string;
    user: Users = new Users();

    constructor(private router: Router, private registerService: RegisterService) { }

    ngOnInit(): void {
    }

    checkOTP(){
        this.registerService.checkOTP(this.user).subscribe(data => {
            this.successMessages = "Registration successfull";
            this.router.navigate(['login']);
            console.log(this.user)
        }, err => {
            this.errorMessages = "OTP doesn't match!";
        });
    }
}
