import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { LoggingInterceptorService } from "./logging-interceptor.service";
import { LoggerService } from "./logger.service";

describe("LoggingInterceptorService tests", () => {
  let httpTestingController: HttpTestingController,
    mockLoggerSvc: any,
    httpClient: HttpClient;

  beforeEach(() => {
    mockLoggerSvc = {
      info: jasmine.createSpy("info"),
      success: jasmine.createSpy("success"),
      error: jasmine.createSpy("error")
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoggingInterceptorService,
          multi: true
        },
        {
          provide: LoggerService,
          useValue: mockLoggerSvc
        }
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it("should log a message when an API is called", () => {
    httpClient.get("api/travellers").subscribe();

    let req = httpTestingController.expectOne("api/travellers");
    req.flush([]);

    expect(mockLoggerSvc.info).toHaveBeenCalled();
    expect(mockLoggerSvc.info).toHaveBeenCalledWith(
      "Calling API: api/travellers"
    );
    expect(req.request.headers.get("Authorization")).toBeDefined();
  });

  it("should log a success message when the API call is successful", () => {
    httpClient.get("api/travellers").subscribe();

    let req = httpTestingController.expectOne("api/travellers");
    req.flush([]);

    expect(mockLoggerSvc.success).toHaveBeenCalled();
    expect(mockLoggerSvc.success).toHaveBeenCalledWith(
      "Call to the API api/travellers succeeded"
    );
  });

  it("should log an error message when the API call is successful", () => {
		httpClient.get('api/travellers').subscribe();

    let req = httpTestingController.expectOne("api/travellers");
    req.error(null, { status: 404 });

    expect(mockLoggerSvc.error).toHaveBeenCalled();
    expect(mockLoggerSvc.error).toHaveBeenCalledWith(
      "Call to the API api/travellers failed with status 404"
    );
  });
});
