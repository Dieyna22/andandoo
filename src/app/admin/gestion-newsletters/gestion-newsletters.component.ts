import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-newsletters',
  templateUrl: './gestion-newsletters.component.html',
  styleUrls: ['./gestion-newsletters.component.css']
})
export class GestionNewslettersComponent {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      searching: false,
      paging: true,
      info: false,
      lengthChange: false,
      pageLength: 2,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }
}
