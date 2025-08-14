import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadSocialLinks } from '../../../shared/states/actions/social-link.actions';
import { AuthService } from '../../../core/guard/auth.service';
import { GetUserInfo,  } from '../../../shared/states/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {
  constructor(private authService: AuthService, private store: Store) {}

  resolve(): Observable<any> {
    const userId = this.authService.getUserIdFromToken();
    return this.store.dispatch([new LoadSocialLinks(userId), new GetUserInfo(userId)]);
  }
}
