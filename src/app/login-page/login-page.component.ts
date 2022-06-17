import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router:Router
  ) { }
  ngOnInit(): void {
    
  }
  getUser(){
    this.authService.GoogleAuth()
    this.authService.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        firebase.auth().signInAnonymously
        this.router.navigate(['home'])
      }
    })
  }
}
