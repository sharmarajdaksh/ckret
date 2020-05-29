import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const loginUrl = `${environment.apiUrl}/login`;
const signupUrl = `${environment.apiUrl}/signup`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false;
  authUsername = '';
  authToken = '';
  authError = '';

  constructor(private router: Router) {}

  checkLogin() {
    const username = localStorage.getItem('ckret_username');
    const token = localStorage.getItem('ckret_token');
    const tokenCreationTime = new Date(
      localStorage.getItem('ckret_creation_time')
    );

    if (username && token) {
      const currentDate = new Date();

      if (
        Math.abs(currentDate.getTime() - tokenCreationTime.getTime()) /
          (1000 * 3600) >
        3
      ) {
        this.logout();
        return;
      }

      this.isAuth = true;
      this.authUsername = username;
      this.authToken = token;
      this.router.navigate(['']);
    }
  }

  login(username: string, password: string) {
    axios
      .post(loginUrl, {
        username,
        password,
      })
      .then((res) => {
        if (!res.data.token) {
          return {
            error: res.data.message,
          };
        }
        console.log(res.data.token);

        this.isAuth = true;
        this.authUsername = username;
        this.authToken = res.data.token;
        this.authError = '';

        localStorage.setItem('ckret_username', username);
        localStorage.setItem('ckret_token', this.authToken);
        localStorage.setItem('ckret_creation_time', new Date().toString());

        this.router.navigate(['']);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  signup(username: string, password: string, confirmPassword: string) {
    axios
      .post(signupUrl, {
        username,
        password,
        confirmPassword,
      })
      .then((res) => {
        if (!res.data.token) {
          return {
            error: res.data.message,
          };
        }
        this.isAuth = true;
        this.authUsername = username;
        this.authToken = res.data.token;
        this.authError = '';

        localStorage.setItem('ckret_username', username);
        localStorage.setItem('ckret_token', this.authToken);
        localStorage.setItem('ckret_creation_time', new Date().toString());

        this.router.navigate(['']);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  logout() {
    localStorage.setItem('ckret_username', '');
    localStorage.setItem('ckret_token', '');

    this.isAuth = false;
    this.authUsername = '';
    this.authToken = '';

    this.router.navigate(['auth']);
  }
}
