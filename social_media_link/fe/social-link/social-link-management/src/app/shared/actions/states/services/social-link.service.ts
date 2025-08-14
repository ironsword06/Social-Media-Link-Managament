import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddSocialLinkPayload, SocialLink } from './models/social-link.model';

@Injectable({
  providedIn: 'root'
})
export class SocialLinkService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSocialLinks(userId: number): Observable<SocialLink[]> {
    return this.http.get<SocialLink[]>(`${this.apiUrl}/get-social-links/${userId}`);
  }

  addSocialLink(payload: AddSocialLinkPayload): Observable<SocialLink> {
    return this.http.post<SocialLink>(`${this.apiUrl}/add-social-link`, payload);
  }

  updateSocialLink(linkId: number, link: AddSocialLinkPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-social-link/${linkId}`, link);
  }

  deactivateSocialLink(linkId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/delete-social-link/${linkId}/deactivate`, {});
  }
}
