import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { UserData } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/user';
  signinSubject = new Subject<boolean | null>();
  signinObservable = this.signinSubject.asObservable();
  
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  signup(email: string, name: string, password: string) {
    return this.http.post<UserData>(`${this.apiUrl}/signup`, { email, name, password });
  }

  signin(email: string, password: string) {
    return this.http.post<UserData>(`${this.apiUrl}/signin`, { email, password })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.signinSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token!);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);    
    this.router.navigate(['/weather']);
  }
}
