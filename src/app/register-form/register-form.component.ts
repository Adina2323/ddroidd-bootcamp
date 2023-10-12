import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  countries: any[] = [];
  cities: string[] = [];
  states: any[] = [];
  selectedCountry: any = null;
  selectedState: any = null;
  joinUsClicked = false;
  errorMessage: string[] = [];
  hasFormErrors = false;

  constructor(private http: HttpClient, private router: Router) { }


  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[+]?[0-9]{0,13}$')
    ]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    lineAddress1: new FormControl('', Validators.required),
    lineAddress2: new FormControl(''),
    countrySelect: new FormControl('', Validators.required),
    stateSelect: new FormControl(''), 
    citySelect: new FormControl('', Validators.required), 
  });
  

  ngOnInit(): void {
    this.http.get('https://countriesnow.space/api/v0.1/countries')
      .subscribe((data: any) => {
        this.countries = data.data;
      });
  }


  updateStates(event: any) {
    const selectedCountryName = event.target.value;
    console.log(selectedCountryName);
    this.selectedCountry = this.countries.find(country =>
      country.country === selectedCountryName);    

    if (selectedCountryName === 'United States') {
      this.http.post('https://countriesnow.space/api/v0.1/countries/states', {
        country: "United States"
      })
      .subscribe((data: any) => {
        this.states = data.data.states;
        this.fetchCities(selectedCountryName);
      } ,
       (error) => {
        console.error('Error fetching states:', error);
      });
    } else{
      this.states = [];
      this.cities = [];
      this.fetchCities(selectedCountryName);
    }
    
  }


  updateCities(event: any) {
    const selectedStateCode = event.target.value;
    console.log(selectedStateCode);
    if (this.selectedCountry && this.selectedCountry.country === 'United States') {
      this.http.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: "United States",
        state: selectedStateCode
      })
        .subscribe((data: any) => {
          this.cities = data.data;
        },
          (error) => {
            console.error('Error fetching cities:', error);
          });
    }
  }

  fetchCities(countryName: string) {
    this.http.post('https://countriesnow.space/api/v0.1/countries/cities', {
      country: countryName
    })
      .subscribe((data: any) => {
        this.cities = data.data;
      },
        (error) => {
          console.error('Error fetching cities:', error);
        });
  }

  isFormControlValid(controlName: string): boolean {
    const control = this.applyForm.get(controlName);
    return control ? control.valid : false;
  }


  add(): void {
    this.joinUsClicked = true;
    this.errorMessage = [];

    if (this.applyForm.valid) {
      // Submission
      console.log("s");
      console.log(this.applyForm.value);
      //localStorage.setItem("data", this.applyForm.value.);
      const formData = this.applyForm.value;
      localStorage.setItem('data', JSON.stringify(formData))
      this.router.navigate(['final']);
    } else {

      if (this.applyForm.get('firstName')?.hasError('required')) {
        this.errorMessage.push('First Name is required.');
      }
      if (this.applyForm.get('lastName')?.hasError('required')) {
        this.errorMessage.push('Last Name is required.');
      }
      if (this.applyForm.get('phoneNumber')?.hasError('required')) {
        this.errorMessage.push('Phone Number is required.');
      }
      if (this.applyForm.get('phoneNumber')?.hasError('pattern')) {
        this.errorMessage.push('Wrong phone number format.');
      }
      if (this.applyForm.get('emailAddress')?.hasError('email')) {
        this.errorMessage.push('Wrong email format.');
      }
      if (this.applyForm.get('lineAddress1')?.hasError('required')) {
        this.errorMessage.push('Address is required.');
      }
      if (this.applyForm.get('countrySelect')?.hasError('required')) {
        this.errorMessage.push('Country is required.');
      }
      if (this.applyForm.get('citySelect')?.hasError('required')) {
        this.errorMessage.push('City is required.');
      }
      if (this.errorMessage.length > 0) {
        this.hasFormErrors = true;
      }
    }
  }
}
