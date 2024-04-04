import {inject, Injectable} from '@angular/core';
import {LoginResponse, logUser, RegistrationResponse, User} from "../../Interfaces/user";
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
  private User: User | null = null;
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
        }),
        catchError((): Observable<null> => {
          alert("Ошибка")
          return of(null);
        }),
      );
  }

  public register(user: logUser): Observable<RegistrationResponse | null> {
    return this.http.post<RegistrationResponse>(environment.backendOrigin + '/auth/registration', user)
      .pipe(
        tap((res: RegistrationResponse) => {
          alert("Пользователь зарегистрирован");
        }),
        catchError((): Observable<null> => {
          localStorage.removeItem('jwt_token');
          alert("Ошибка")
          return of(null);
        })
      );
  }

  public checkToken(): void {
    const token = localStorage.getItem(this.JWT_TOKEN);
    this.wasLogin = !!token; // This will set wasLogin to true if token exists, otherwise to false
    if (token) {
      this.User = this.parseJwt(token);
    }
  }

  private parseJwt(token: string): User {
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
}
