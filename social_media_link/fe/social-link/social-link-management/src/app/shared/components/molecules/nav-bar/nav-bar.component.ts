import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "../../../../core/guard/auth.service";
import { RecentLinksService } from "../../../actions/states/services/recent-links.service";
import { User } from "../../../actions/states/services/models/user.model";
import { UserInfoComponent } from "../user-info/user-info.component";
import { DynamicDialogService } from "../../../actions/states/services/dynamic-popup.service";
import { Observable } from "rxjs";
import { UserState } from "../../../states/user.state";
import { Store } from "@ngxs/store";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl:'./nav-bar.component.css',
    standalone: true,
    imports: [CommonModule],

  })
  export class NavBarComponent implements OnInit {
    @Input() user:User
    user$: Observable<User>;
    menuItems = [
        { label: 'About Us', href: 'https://github.com/ironsword06' },
        { label: 'Events', href: 'https://github.com/ironsword06' },
        { label: 'Services', href: 'https://github.com/ironsword06' },
        { label: 'Products', href: 'https://github.com/ironsword06' }
      ];
    
      socialMediaIcons = [
        { href: 'https://github.com/ironsword06', class: 'pi-facebook' },
        { href: 'https://github.com/ironsword06', class: 'pi-twitter' },
        { href: 'https://www.linkedin.com/in/alicandemirklc/', class: 'pi-linkedin' }
      ];
      
      constructor(private authService:AuthService, private recentLinksService:RecentLinksService, private dynamicPopup:DynamicDialogService, private store:Store){}

      ngOnInit() {
        this.user$ = this.store.select(UserState.getUser);
      }

      logout(){
        this.authService.logout()      }

      handleLinkClick(link: string): void {
        this.recentLinksService.addLink(link);
      }

      openUserInfoModal(data?: User){
          const dialogRef = this.dynamicPopup.openDialog(
            UserInfoComponent,
            data
          );
        
      }
  }