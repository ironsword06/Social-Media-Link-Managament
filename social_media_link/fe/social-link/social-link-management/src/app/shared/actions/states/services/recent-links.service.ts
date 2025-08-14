import { Injectable } from '@angular/core';
import { AuthService } from '../../../../core/guard/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecentLinksService {

  private readonly STORAGE_KEY_PREFIX = 'recentLinks_';

  constructor(private authService: AuthService) { }

  private getStorageKey(): string {
    const userId = this.authService.getUserIdFromToken();
    return `${this.STORAGE_KEY_PREFIX}${userId}`;
  }

  addLink(link: string): void {
    const storageKey = this.getStorageKey();
    const recentLinks = this.getLinks();

    const filteredLinks = recentLinks.filter(existingLink => existingLink !== link);

    filteredLinks.unshift(link);

    if (filteredLinks.length > 5) {
      filteredLinks.pop();
    }

    localStorage.setItem(storageKey, JSON.stringify(filteredLinks));
  }

  getLinks(): string[] {
    const storageKey = this.getStorageKey();
    const links = localStorage.getItem(storageKey);
    return links ? JSON.parse(links) : [];
  }
}