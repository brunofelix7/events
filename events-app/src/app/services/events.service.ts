import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EventsService {

	private _url = 'http://localhost:3000/api';

	constructor(private http: HttpClient) {

	}

	getEvents() {
		return this.http.get<any>(`${this._url}/events`);
	}

	getSpecial() {
		return this.http.get<any>(`${this._url}/special`);
	}

}
