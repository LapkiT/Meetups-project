import {inject, Injectable} from '@angular/core';
import { LoginResponse, logUser, RegistrationResponse, User} from "../../Interfaces/user";
import {catchError, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserLogRegService {
  private readonly JWT_TOKEN = 'jwt_token'
  private http = inject(HttpClient);
  public wasLogin: boolean | null = null;
  public userRole: boolean | null = null;
  private User: User | null = null;
  public userId!: number;
  public login(user: logUser): Observable<User | null> {
    return this.http.post<LoginResponse>(environment.backendOrigin + '/auth/login', user)
      .pipe(
        tap((res: LoginResponse) => {
          if (res && res.token) {
            localStorage.setItem('jwt_token', res.token);
          }
          this.wasLogin = true;
        }),
        map((res: LoginResponse): User => this.parseJwt(res.token)),
        tap((user: User) => {
          this.userRole = user.roles[0].name == "ADMIN" ? true : false;
        })
      );
  }

  public register(user: logUser): Observable<RegistrationResponse | null> {
    return this.http.post<RegistrationResponse>(environment.backendOrigin + '/auth/registration', user)
  }

  public checkToken(): void {
    const token = localStorage.getItem(this.JWT_TOKEN);
    this.wasLogin = !!token;
    if (token) {
      this.User = this.parseJwt(token);
      this.userRole = this.User.roles[0].name == "ADMIN" ? true : false;
      this.userId = this.User.id;
      console.log(this.userRole)
    }
  }

  public parseJwt(token: string): User {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public logout() {
    localStorage.removeItem('jwt_token');
    this.User = null;
    this.wasLogin = false;
  }

  public get Users() {
    return this.User;
  }
}
