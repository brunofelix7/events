import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
	selector: 'app-special',
	templateUrl: './special.component.html',
	styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

	special: [];

	constructor(private eventsService: EventsService, private router: Router) { }

	ngOnInit() {
		this.eventsService.getSpecial().subscribe(
			res => this.special = res,
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
