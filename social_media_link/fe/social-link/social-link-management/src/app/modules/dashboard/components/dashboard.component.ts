import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialLink } from '../../../shared/actions/states/services/models/social-link.model';
import { SocialLinkState } from '../../../shared/states/social-link.state';
import { NgClass } from '@angular/common';
import { SocialMediaTableComponent } from '../../../shared/components/molecules/social-media-table/social-media-table.component';
import { NavBarComponent } from '../../../shared/components/molecules/nav-bar/nav-bar.component';
import { RecentLinksComponent } from '../../../shared/components/molecules/recent-links/recent-links.component';
import { UserState } from '../../../shared/states/user.state';
import { User } from '../../../shared/actions/states/services/models/user.model';
import { AuthService } from '../../../core/guard/auth.service';

@Component({
  selector: 'app-social-media-page',
  templateUrl: './dashboard.component.html',
  styleUrl:'./dashboard.component.css',
  standalone: true,
  imports: [NgClass, SocialMediaTableComponent, NavBarComponent,RecentLinksComponent],
})
export class DashboardComponent implements OnInit {

  socialLinks$: Observable<SocialLink[]>;
  sortedSocialLinks: SocialLink[] = [];
  userInfo$: Observable<User>;
  user:User;
  userRoleId:number;

  constructor(private store: Store, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.socialLinks$ = this.store.select(SocialLinkState.getSocialLinks)
    this.userInfo$ = this.store.select(UserState.getUser)
    this.socialLinks$.pipe(
      map(links => [...links].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))
    ).subscribe(sortedLinks => {
      this.sortedSocialLinks = sortedLinks;
    });

    this.userInfo$.subscribe(user => {
      this.user = user;
    });

    this.userRoleId = this.authService.getUserRole()

  }
}