import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Hero }    from './hero';
import { HeroService } from '../common/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
    HeroService: any;
    powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
    model = new Hero(18, 'Rohitash', this.powers[0], 'Chuck Overstreet');
    /*getHeroes(): void {
        model = this.HeroService.getHeroes();
    }*/
    //model = this.HeroService.getHeroes();

    submitted = false;
    onSubmit() { this.submitted = true; }
    newHero() {
        this.model = new Hero(42, '', '');
    }
    
    birthday = new Date(1988, 3, 15); // April 15, 1988
    toggle = true; // start with true == shortDate

    get format()   { return this.toggle ? 'shortDate' : 'fullDate'; }
    toggleFormat() { this.toggle = !this.toggle; }

    
}
