import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
constructor(private http: Http) {
       
}
   /*submitForm(){
   	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost/angular2/angularApi/signup.php',{book} , options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
   console.log("come here") 
  }*/
}