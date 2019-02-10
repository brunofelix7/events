import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventsService } from './../../services/events.service';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

	events: [];

	constructor(private eventsService: EventsService, private router: Router) { }

	ngOnInit() {
		this.eventsService.getEvents().subscribe(
			res => this.events = res,
			error => {
				if(error instanceof HttpErrorResponse) {
					if(error.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			}
		);
	}

}
