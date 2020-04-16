import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class LoggerService {
	public info(message: string) {
		console.info(message);
	}

	public success(message: string) {
		console.log(message);
	}

	public error(message: string) {
		console.error(message);
	}
}
