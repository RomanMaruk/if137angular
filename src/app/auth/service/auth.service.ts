import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterRequstInterface, UserInterface } from '../models/registerRequst.interface';
import { AuthResponsUserInterface, CurrentUserInterface } from '../models/currentUser.interface'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogIn: boolean
  constructor(public http: HttpClient, private router: Router, private fbAuth: AngularFireAuth) {
    this.userLogIn = false
  
    this.fbAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLogIn = true
      } else {
        this.userLogIn = false
      }
    })
  }
  
    register(user: UserInterface): Promise<any> {
      return this.fbAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          result.user?.sendEmailVerification()
        })
        .catch(error => {
          console.log('Auth Services sign up error ', error);
          return {isValid: false, message: error.message}
        })
    }
}




























  // register(data: RegisterRequstInterface): Observable<CurrentUserInterface> {
  //   const url = 'https://api.realworld.io/api/users'

  //   return this.http.post<AuthResponsUserInterface>(url, data)
  //     .pipe(
  //       map((response: AuthResponsUserInterface) => response.user),
  //     )
  // }