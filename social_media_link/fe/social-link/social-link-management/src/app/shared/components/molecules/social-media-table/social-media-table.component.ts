import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SocialLink } from '../../../actions/states/services/models/social-link.model';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { AtomButtonComponent } from '../../atoms/atom-btn/atom-btn.component';
import { DynamicDialogService } from '../../../actions/states/services/dynamic-popup.service';
import { SocialMediaFormComponent } from '../social-media-form/social-media-form.component';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { UppercaseSocialPipe } from '../../../pipes/uppercase-social.pipe';
import { RecentLinksService } from '../../../actions/states/services/recent-links.service';
import { DeleteSocialLinkComponent } from '../delete-link/delete-link.component';
import { UserInfoAdminComponent } from '../user-ınfo-admin/user-info-admin.component';


@Component({
  selector: 'app-social-media-table',
  templateUrl: './social-media-table.component.html',
  styleUrl: './social-media-table.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MenubarModule,
    CommonModule,
    AtomButtonComponent,
    MatButtonModule,
    MatIconModule,
    UppercaseSocialPipe
  ],
})
export class SocialMediaTableComponent implements AfterViewInit, OnChanges {
  constructor(
    private dynamicPopup: DynamicDialogService,
    private recentLinksService:RecentLinksService
  ) {}
  @Input() socialLinks: SocialLink[] = [];
  @Input() pageSize = 10;
  @Input() userRoleId: number = 2;

  displayedColumns: string[] = ['link', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<SocialLink>(this.socialLinks);
  dataExist: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _liveAnnouncer = inject(LiveAnnouncer);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['socialLinks']) {
      this.socialLinks.length <= 0
        ? (this.dataExist = false)
        : (this.dataExist = true);
      this.dataSource.data = this.socialLinks;
    }
    if (changes['userRoleId']) {
      this.updateDisplayedColumns();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateDisplayedColumns() {
    if (this.userRoleId === 1) {
      this.displayedColumns = ['link', 'name', 'description', 'username', 'actions'];
    } else {
      this.displayedColumns = ['link', 'name', 'description', 'actions'];
    }
  }

  announceSortChange(sortState: Sort) {
    this._liveAnnouncer.announce(
      sortState.direction ? `Sorted ${sortState.direction}ending` : 'Sorting cleared'
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.checkIfDataExists();
  }

  checkIfDataExists() {
    this.dataSource.filteredData.length === 0
      ? (this.dataExist = false)
      : (this.dataExist = true);
  }

  deleteRow(element: SocialLink) {
    const dialogRef = this.dynamicPopup.openDialog(
      DeleteSocialLinkComponent,
      element
    );
  }

  openUserEditModal(element){
    const dialogRef = this.dynamicPopup.openDialog(
      UserInfoAdminComponent,
      element
    );
  }

  socialLinkModal(data?: SocialLink): void {
    const dialogRef = this.dynamicPopup.openDialog(
      SocialMediaFormComponent,
      data
    );
  }

  handleLinkClick(link: string): void {
    this.recentLinksService.addLink(link);
  }
}
