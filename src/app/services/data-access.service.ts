import { Injectable } from "@angular/core";
import { Traveller } from "./traveller";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { Observable, throwError } from "rxjs";

const DATA_ACCESS_PREFIX: string = "api/travellers";
// const DATA_ACCESS_PREFIX: string = "travellers"

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  constructor(private client: HttpClient) {}

  getTravellers(): Observable<Traveller[]> {
    return this.client.get<Traveller[]>(`${DATA_ACCESS_PREFIX}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          `Error retreiving travellers data. ${error.statusText || "Unknown"} `
        );
      })
    );
  }

  deleteTraveller(id: number): Observable<any> {
    return this.client.delete<Traveller>(`${DATA_ACCESS_PREFIX}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          `Error deleting travellers data. ${error.statusText || "Unknown"} `
        );
      })
    );
  }

  createTraveller(traveller: Traveller) {
    return this.client.post(`${DATA_ACCESS_PREFIX}`, traveller);
  }

  updateTraveller(traveller: Traveller, id: number) {
    return this.client.patch(`${DATA_ACCESS_PREFIX}/${id}`, traveller);
  }
}

@Injectable({
  providedIn: "root"
})
export class CalculationsService {
  add(a: number, b: number): number {
    return a + b;
  }
}
