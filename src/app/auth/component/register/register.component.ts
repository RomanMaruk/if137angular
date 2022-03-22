import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CurrentUserInterface } from '../../models/currentUser.interface';
import { AuthService } from '../../service/auth.service';
import { RegisterAction } from '../../store/register.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  fireBaseErrorMessege: string = '';
  
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private store: Store, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.registerForm.hasError('required')) {
      return 'You must enter a value';
    }
    return
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }

    this.authService.register(this.registerForm.value)
      .then((result) => {
        if (result == null) {
          this.router.navigate(['/'])
        } else if (result.isValid == false) {
          this.fireBaseErrorMessege = result.message
          console.log('Error ', this.fireBaseErrorMessege);
          
        }
      }).catch(() => {
        
      })
  }

}

