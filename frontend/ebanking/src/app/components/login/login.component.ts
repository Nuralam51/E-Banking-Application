import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: Users = new Users();
    errorMessage: string;
    successMessage: string;
    hidden: boolean;
    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
        this.hidden = true;
        if (this.loginService.currentUserValue.role === "ADMIN") {
            this.router.navigate(['/admin/dashboard']);
        }
        else {
            this.router.navigate(['/dashboard']);
        }
    }

    login() {
        this.hidden = false;
        this.loginService.login(this.user).subscribe(data => {
            if (this.loginService.currentUserValue.role === "ADMIN") {
                this.router.navigate(['/admin/dashboard']);
            }
            else {
                this.router.navigate(['/dashboard']);
            }
            this.hidden = true;
        }, err => {
            this.errorMessage = "Email and password is wrong.";
        });
    }
}
