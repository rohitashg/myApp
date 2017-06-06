import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Hero }    from './signup/hero';
import { HEROES } from './common/mock-heroes';
@Component({
  selector: 'app-home',	
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor () {
    console.log(HEROES);
  }
}
