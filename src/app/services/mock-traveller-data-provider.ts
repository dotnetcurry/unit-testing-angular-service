import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class MockTravellerData implements InMemoryDbService {
    constructor(){
        
    }
    createDb(){
        let travellers = [
              {
                id: 2,
                "firstName": "John",
                "lastName": "Kelly",
                "city": "Boston",
                "country": "USA",
                "age": 18
              },
              {
                id: 11,
                "firstName": "Rahul Shrath",
                "lastName": "Dravid",
                "age": "40",
                "city": "Bengaluru",
                "country": "India"
              },
              {
                id: 10,
                "firstName": "Sachin ",
                "lastName": "Tendulkar",
                "age": "41",
                "city": "Mumbai",
                "country": "India"
              }
            ];
        return {travellers};
    }
}