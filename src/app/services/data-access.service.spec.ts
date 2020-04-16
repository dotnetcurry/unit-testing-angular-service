import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { DataAccessService, CalculationsService } from "./data-access.service";
import { Traveller } from "./traveller";

describe("DataAccessService", () => {
  let httpTestingController: HttpTestingController;
  let dataAccessService: DataAccessService;
  let baseUrl = "api/travellers";
  let traveller: Traveller;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    traveller = {
      id: 2,
      firstName: "John",
      lastName: "Kelly",
      city: "Boston",
      country: "USA",
      age: 18
    };
  });

  beforeEach(inject(
    [DataAccessService],
    (service: DataAccessService) => {
      dataAccessService = service;
    }
  ));

  it("should be created", () => {
    expect(dataAccessService).toBeTruthy();
  });

  it("should return data", () => {
    let result: Traveller[];
    dataAccessService.getTravellers().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });

    req.flush([traveller]);

    expect(result[0]).toEqual(traveller);
  });

  it("should throw error", () => {
    let error: string;
    dataAccessService.getTravellers().subscribe(null, e => {
      error = e;
    });

    let req = httpTestingController.expectOne("api/travellers");
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Error retreiving travellers data") >= 0).toBeTruthy();
  });

  it("should call delete traveller API", () => {
    dataAccessService.deleteTraveller(1).subscribe();
    let id = 1;
    let req = httpTestingController.expectOne({
      method: "DELETE",
      url: `${baseUrl}/${id}`
    });

    expect(req).toBeDefined();
  });

  it("should throw error when delete API fails", () => {
    let error: string;
    dataAccessService.deleteTraveller(2).subscribe(null, e => {
      error = e;
    });

    let req = httpTestingController.expectOne({
      method: "DELETE",
      url: `${baseUrl}/2`
    });
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Network error") >= 0).toBeTruthy();
  });

  it("should call POST API to create a new traveller", () => {
    dataAccessService.createTraveller(traveller).subscribe();

    let req = httpTestingController.expectOne({ method: "POST", url: baseUrl });
    expect(req.request.body).toEqual(traveller);
  });

  it("should call patch API to update a traveller", () => {
    dataAccessService.updateTraveller(traveller, traveller.id).subscribe();

    let req = httpTestingController.expectOne({
      method: "PATCH",
      url: `${baseUrl}/${traveller.id}`
    });
    expect(req.request.body).toEqual(traveller);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});


// describe('CalculationsService tests', () => {
//   let calculationsSvc: CalculationsService;

//   beforeEach(inject(
//     [CalculationsService],
//     (calcService: CalculationsService) => {
//       calculationsSvc = calcService;
//     }
//   ));

//   it("should add two numbers", () => {
//     let result = calculationsSvc.add(2, 3);
//     expect(result).toEqual(5);
//   });
// });