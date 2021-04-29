import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { RegisterService } from 'src/app/services/register.service';
import { RegisterComponent } from '../register/register.component';

@Component({
    selector: 'app-register-info',
    templateUrl: './register-info.component.html',
    styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit {

    bankAccount: Bankaccount = new Bankaccount();
    user: Users = new Users();
    errorMessages: string;
    registerComponent: RegisterComponent
    disable = false;

    constructor(private router: Router, private registerService: RegisterService) { }

    ngOnInit(): void {
        console.log(this.registerComponent.inputAccount)
    }

    register(){
        this.disable = true;
        this.registerService.register(this.user).subscribe(data => {
            this.router.navigate(['register/otp']);
            this.disable = false;
        }, err => {
            this.errorMessages = "Registration cant success. Try again..."
        });
    }

}
