import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
constructor(private http: Http) {
       
}
    contact : Object= {};
   submitForm(){
  
    if(this.contact){
      console.log(this.contact);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('http://localhost/angular2/angularApi/signup.php',this.contact,options)
      .toPromise()
      .then(response => response.json())
    }
    
                   //.map()
                   //.catch(this.handleErrorObservable);
  
  }
}