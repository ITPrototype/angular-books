import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) {}
  GoogleAuth(){
    return this.AuthLogin(new GoogleAuthProvider());
  }
  showLogin = false
  async AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider){
    const result = await this.afAuth
      .signInWithPopup(provider);
    return result;
  }
}
