import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  countries: any[];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any[]) => {
        this.countries = data;
        //console.log(this.countries);
      });
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
  };

  
  submitted = false;

  onSubmit() {
    this.submitted = true;

    this.formData.push(this.Forms.value);
    console.log(this.formData);

    this.Forms.reset();
  }
}
