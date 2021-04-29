import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Feather from 'feather-icons';
import { Transaction } from '../../common/transaction';
import { TransactionService } from '../../services/transaction.service';

import * as jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

    transactionList: Array<Transaction>;
    errorMessages: string;
    successMessages: string;
    transaction: Transaction = new Transaction();

    constructor(private router: Router, private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.getTransactionList();
    }

    ngAfterViewInit() {
        Feather.replace();
    }

    findTransactionList() {
        console.log(this.transaction);
    }

    getTransactionList() {
        this.transactionService.getAllTransactions().subscribe(data => {
            this.transactionList = data;
        });
    }

    downloadPDF() {
        var doc = new jspdf.jsPDF('p', 'pt', 'A4');
        var row = [];

        doc.setFont('Monaco');
        doc.setFontSize(12);
        doc.text('All Transactions', 250, 30);
        doc.setFontSize(11)
        doc.setTextColor(100);

        this.transactionList.forEach(element => {
            var temp = [element.type, element.status, element.amount, element.date];
            row.push(temp);
        });

        (doc as any).autoTable({
            head: [['Type', 'Status', 'Amount (Taka)', 'Date']],
            body: row,
            theme: 'grid',
        })

        doc.output('dataurlnewwindow')
        doc.save("transactions.pdf");
    }
}
