import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EditBody, EditResponse, EditUser, roleResponse, Roles, UsFetchData} from "../../Interfaces/user";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private httpClient = inject(HttpClient);
  public allUsers: UsFetchData[] = [];


  public fetchUsers(): Observable<UsFetchData[] | never> {

    return this.httpClient.get<UsFetchData[]>(`${environment.backendOrigin}/user`).pipe(
      map((response: UsFetchData[]) => response.sort((a, b) => a.id - b.id)),
      tap((response: UsFetchData[]) => {
        this.allUsers = response;
      })
    );
  }

  public deleteUser(id: number): Observable<UsFetchData | never> {
    return this.httpClient.delete<UsFetchData>(`${environment.backendOrigin}/user/${id}`).pipe(
      tap((response: UsFetchData) => {
        this.allUsers = this.allUsers.filter(
          (user) => user.id !== response.id
        );
      })
    );
  }

  public editUser(
    Inf: EditUser
  ): Observable<EditResponse> {

    const body: EditBody = {
      email: Inf.email,
      fio: Inf.fio,
    };

    return this.httpClient.put<EditResponse>(`${environment.backendOrigin}/user/${Inf.id}`, body).pipe(
      tap((response: EditResponse) => {
        let updatedUser = this.allUsers.find(
          (user) => user.id === response.id
        );

        if (!updatedUser) return;

        updatedUser = {
          ...updatedUser,
          email: response.email,
          fio: response.fio,
        };

        this.allUsers = this.allUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
    );
  }

  public changeRole(id: number, role: string) {
    const body: roleResponse = {
      name: role,
      userId: id,
    };

    return this.httpClient.put<roleResponse>(`${environment.backendOrigin}/user/role`, body).pipe(
      tap((response: roleResponse) => {
        let updatedUser = this.allUsers.find(
          (user) => user.id === response.userId
        );

        if (!updatedUser) return;

        const newRole: Roles = {
          name: response.name,
        };

        updatedUser = {
          ...updatedUser,
          roles: [...updatedUser.roles, newRole],
        };

        this.allUsers = this.allUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
    );
  }

}
