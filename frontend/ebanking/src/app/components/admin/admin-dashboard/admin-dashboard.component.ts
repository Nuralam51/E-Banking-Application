import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { LoginService } from 'src/app/services/login.service';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    userList: Array<Users>;
    bankUserList: Array<Bankaccount>;
    activeCard: number;
    currentUser: Users;

    constructor(private route: Router, private adminDashboardService: AdminDashboardService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        if (!this.currentUser) {
            this.route.navigate(['/login']);
        }
        this.findAllUsers();
        this.findAllBankUsers();
        this.ngAfterViewInit();
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    findAllUsers() {
        this.adminDashboardService.findAllUser().subscribe(data => {
            this.userList = data;
        });
    }

    findAllBankUsers() {
        this.adminDashboardService.findAllBankUser().subscribe(data => {
            this.bankUserList = data;
        });
    }

}
