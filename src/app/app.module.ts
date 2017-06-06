import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { routing } from './app.route';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { PriceComponent } from './price/price.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServiceComponent,
    PortfolioComponent,
    TestimonialComponent,
    PriceComponent,
    ContactComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpModule,
	  routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
