import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequest, SignupResponse, UpdateUserRequest, User, Username } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, request);
  }

  getUserInfo(userId: number): Observable<User> {
    const params = new HttpParams({ fromObject: { userId } });
    return this.http.get<User>(`${this.apiUrl}/get-user-info`, { params });
  }

  updateUser(user: Partial<SignupRequest>): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-user-info`, user);
  }

  adminUpdateUser(userId: number, updateData: UpdateUserRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin-update-user/${userId}`, updateData);
  }

  deactivateUser(userId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin-deactivate-user/${userId}`, {});
  }
}
