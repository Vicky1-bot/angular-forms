import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent implements OnInit {
  countries: any[];
  datePipe: DatePipe;

  constructor(private http: HttpClient, datePipe: DatePipe) {
    this.datePipe = datePipe;
  }

  ngOnInit(): void {
    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any[]) => {
        this.countries = data;
        //console.log(this.countries);
      });

    // Check if there is any saved form data in local storage
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      // If there is, parse the data and assign it to the formData array
      this.formData = JSON.parse(savedFormData);
    }
    console.log(savedFormData);
  }

  formData = [];
  title = 'Forms';
  @ViewChild('f') Forms: NgForm;
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: '',
    countries: '',
    address: '',
    dob: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;

    // Push the form data to the formData array
    this.formData.push(this.Forms.value);

    // Save the formData array to local storage
    localStorage.setItem('formData', JSON.stringify(this.formData));

    this.Forms.reset();
    this.nameInputLength = 0;
    this.addressInputLength = 0;
  }
  @ViewChild('Name') Name: NgModel;
  nameInputLength = 0;

  @ViewChild('address') address: NgModel;
  addressInputLength = 0;

  ngAfterViewInit() {
    // Subscribe to the valueChanges observable of the NgModel directive for the Name input
    this.Name.valueChanges.subscribe((value: string) => {
      // Update the nameInputLength property with the length of the input value
      this.nameInputLength = value.length;
    });

    // Subscribe to the valueChanges observable of the NgModel directive for the address input
    this.address.valueChanges.subscribe((value: string) => {
      // Update the addressInputLength property with the length of the input value
      this.addressInputLength = value.length;
    });
  }
}
