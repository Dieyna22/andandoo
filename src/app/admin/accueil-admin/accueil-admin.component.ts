import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      searching: true,
      info: false,
      lengthChange: false,
      pageLength:2,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }
}
