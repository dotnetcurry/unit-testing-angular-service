import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { Traveller } from '../services/traveller';
@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
  message: string;
  constructor(private dataAccess: DataAccessService) { }

  ngOnInit() {
  }

  createTraveller(){
    let traveller:Traveller = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      city: this.city,
      country: this.country
    };

    this.dataAccess.createTraveller(traveller)
      .subscribe(
        success => alert("Done"),
        error => alert(error)
      );
  }

  updateTraveller(){
    let traveller:Traveller = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      city: this.city,
      country: this.country
    };

    this.dataAccess.updateTraveller(traveller, this.id)
      .subscribe(
        success => alert("Done"),
        error => alert(error)
      );
  }
  

}
