/**MODULES */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/**ROUTING */
import { AppRoutingModule } from './app-routing.module';

/**SERVICES */
import { AuthService } from './services/auth.service';
import { EventsService } from './services/events.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

/**GUARDS */
import { AuthGuard } from './guards/auth.guard';

/**COMPONENTS */
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { SpecialComponent } from './components/special/special.component';

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		LoginComponent,
		EventsComponent,
		SpecialComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [ AuthService, EventsService, AuthGuard, { 
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptorService,
		multi: true
	} ],
	bootstrap: [ AppComponent ]
})

export class AppModule { }
