import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Bankaccount } from 'src/app/common/bankaccount';
import { Users } from 'src/app/common/users';
import { AdminDashboardService } from '../../../services/admin-dashboard.service'

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.css']
})
export class TotalUsersComponent implements OnInit {

  userList: Array<Users>;
  bankUserList: Array<Bankaccount>;

  constructor(private adminDashboardService: AdminDashboardService, private router: Router) { }

  ngOnInit(): void {
    this.findAllUsers();
    this.findAllBankUsers();
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  findAllUsers(){
    this.adminDashboardService.findAllUser().subscribe(data => {
      this.userList = data;
    });
  }

  findAllBankUsers(){
    this.adminDashboardService.findAllBankUser().subscribe(data => {
      this.bankUserList = data;
    });
  }
}
