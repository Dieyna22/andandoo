import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-users',
  templateUrl: './gestion-users.component.html',
  styleUrls: ['./gestion-users.component.css']
})
export class GestionUsersComponent {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      searching: true,
      paging: true,
      info: false,
      lengthChange: false,
      pageLength:2,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }
}
