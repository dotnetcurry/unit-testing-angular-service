import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { Traveller, Travellers } from '../services/traveller';

@Component({
  selector: 'app-traveller-list',
  templateUrl: './traveller-list.component.html',
  styleUrls: ['./traveller-list.component.css']
})
export class TravellerListComponent implements OnInit {

  travellers: Array<Traveller> = [];
  messages: Array<string> = [];

  constructor(private dataAccess: DataAccessService) { }

  ngOnInit() {
    this.dataAccess.getTravellers()
      .subscribe(
        travellers => {
          this.travellers = this.travellers.concat(travellers);
        },
        error => this.messages.push(error) // You may show error message on the template
      );
  }

  deleteTraveller(id){
    console.log("deleting "+ id);
    this.dataAccess.deleteTraveller(id).subscribe( 
      (msg) => console.log(msg),
      (error) => console.log(error)
    );
  }

}
