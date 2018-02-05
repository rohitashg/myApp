import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
//import { Hero }    from './hero';
import { HeroService } from '../common/common.service';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'app-signup',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component  {
inviteFormObj :any ={};
  constructor(private http : Http) { 
  	
  }

  	submitForm ( formData ) {		   
  	console.log(formData) 
		    if(formData) {
			      	let ob = {
			        	name : formData.fName + " "+ formData.lName,
				        email: formData.email
			      	}  
			      	console.log( "making http request", formData);
			      	//let body = JSON.stringify(param) || null;
		          	let headers = new Headers({ 'Content-Type': 'application/json' });
    				let options = new RequestOptions({ headers: headers });
					this.http.post("http://localhost/angular2/angularApiCore/signup.php", ob, options).map((res: Response) => res.json());    
			}
 	}
}
