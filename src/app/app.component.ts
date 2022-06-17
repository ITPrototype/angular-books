import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import  firebase  from "firebase/compat/app"
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    public authService: AuthService,
    public router: Router
  ){}
  isLogged:any
  title = 'ng-project';
  showIntro = true
  mainContent = false
  signedOut = false
  LoggedIn = true
  ngOnInit(){
    this.showIn()
    this.checkedUser()
  }
  checkedUser(){
    this.authService.afAuth.authState.subscribe(res=>{
      if(res && res.uid){
        this.isLogged = res.displayName
        this.signedOut = true
        this.LoggedIn = false
        console.log(res);
        console.log(this.isLogged);
        console.log(res.displayName);
        
      }else{
        this.isLogged = 'Login'
        this.signedOut = false
        this.LoggedIn = true
      }
    })
  }
  showIn(){
    setTimeout(() => {
      this.showIntro = false
      this.mainContent = true
    }, 3000);
    this.showIntro=true
    this.mainContent =false
  }
  showLogin = false
  signOut(){
    firebase.auth().signOut()
    localStorage.clear()
    this.checkedUser()
    this.router.navigate(['/'])
    this.mainContent = false
    this.showLogin = true
  }
}
