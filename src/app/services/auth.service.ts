import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Service which contains the methods to manage the logged in User
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router
    ) { }

    /**
     * Logout the active user. Clears the Session and navigates to the landing page.
     */
  logout() {
    sessionStorage.clear();
    this.loggedIn.next(false);
    this._router.navigate(['/']);
  }

  /**
   * Flags that a user has logged in to the application
   */
  login() {
    this.loggedIn.next(true);
    this._router.navigate(['/']);
  }

  /**
   * Method called to check if there is an active user logged in to the application.
   * @returns {Observable<boolean>} Subscribers get notified when the state changes.
   */
  get isLoggedIn() {
    if (sessionStorage.getItem('tokenResponse')) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }
}
