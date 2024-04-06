import {inject, Injectable, OnInit} from '@angular/core';
import {CreateBody, Meetup} from "../../Interfaces/meetups";
import { map, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLogRegService} from "../UsersServices/user-log-reg.service";

@Injectable({
  providedIn: 'root'
})
export class MeetupsServicesService {
  public meetups: Meetup[] = [];
  public userService = inject(UserLogRegService);
  private httpClient = inject(HttpClient);

  public httpMeetupsAll(): Observable<Meetup[]> {
    return this.httpClient.get<Meetup[]>(environment.backendOrigin + "/meetup").pipe(
      tap((res: Meetup[]) => {
        this.meetups = res;
      })
    )
  }

  public httpMeetupSub(idMeetup: number, idUser: number ): Observable<Meetup> {
    return this.httpClient.put<Meetup>(environment.backendOrigin + "/meetup", {
      idMeetup: idMeetup,
      idUser: idUser
    }).pipe(
      tap((res: Meetup) => {
        this.meetups = this.meetups.map(m => m.id === res.id ? res : m)
      }),
    )
  }

  public httpMeetupUnSub(idMeetup: number, idUser: number ): Observable<Meetup> {
    return this.httpClient.delete<Meetup>(environment.backendOrigin + "/meetup", {
      body: { idMeetup, idUser}
    }).pipe(
      tap((res: Meetup) => {
        this.meetups = this.meetups.map(m => m.id === res.id ? res : m)
      })
    )
  }

  public httpMeetupMyMeetup(): Observable<Meetup[]> {
    return this.httpMeetupsAll().pipe(
      map((res: Meetup[]) =>
      res.filter(
        (meetup) => meetup.owner.id === this.userService.userId
        )
      ),
      tap((res: Meetup[])=> this.meetups = res)
    )
  }

  public HttpDeleteMeetup(id: number): Observable<Meetup> {
    return this.httpClient.delete<Meetup>(environment.backendOrigin + `/meetup/${id}`).pipe(
      tap((res: Meetup) => {
        this.meetups = this.meetups.filter(
          (meetup) => meetup.id !== res.id
        );
      })
    );
  }

  public createMeetup(
    meetupInfo: CreateBody
  ): Observable<Meetup | never> {
    const urlToFetch = `${environment.backendOrigin}/meetup`;
    const body = this.getCreateMeetupRequestBody(meetupInfo);

    return this.httpClient.post<Meetup>(urlToFetch, body);
  }

  private getCreateMeetupRequestBody(meetupInfo: CreateBody) {
    const camelToSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    const meetupInfoEntries: [string, any][] = Object.entries(meetupInfo);

    const bodyEntries = meetupInfoEntries.map(([key, value]) => {
      const keySnakeCase = camelToSnakeCase(key);
      return [keySnakeCase, value];
    });

    return Object.fromEntries(bodyEntries);
  }

}
