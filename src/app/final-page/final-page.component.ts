import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.scss']
})
export class FinalPageComponent implements OnInit {
  formattedData: string | undefined;

  constructor() {}

  ngOnInit(): void {
    // Replace this with your data retrieval logic from local storage
    const dataFromLocalStorage = localStorage.getItem('data');

    if (dataFromLocalStorage) {
      // Parse the data from local storage
      const data = JSON.parse(dataFromLocalStorage);

      // Format the data for display
      this.formattedData = `
        First name: ${data.firstName}
        Last name: ${data.lastName}
        Phone number: ${data.phoneNumber}
        Email: ${data.emailAddress}
        Address: ${data.lineAddress1}, ${data.lineAddress2}
        Country: ${data.countrySelect}
        State: ${data.stateSelect}
        City: ${data.citySelect}
      `;
    }
  }
}





