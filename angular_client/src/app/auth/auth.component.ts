import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faLock = faLock;
  isSignup = false;
  username = '';
  password = '';
  confirmPassword = '';

  paramsSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuth) {
      this.router.navigate(['']);
    }

    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      this.isSignup = params.sol === 'signup';
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  signup() {
    this.authService.signup(this.username, this.password, this.confirmPassword);
  }

  login() {
    this.authService.login(this.username, this.password);
  }
}
