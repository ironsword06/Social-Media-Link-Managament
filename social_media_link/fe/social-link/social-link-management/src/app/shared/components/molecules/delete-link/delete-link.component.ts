import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { DeactivateSocialLink, LoadSocialLinks } from '../../../states/actions/social-link.actions';
import { AuthService } from '../../../../core/guard/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SocialLink } from '../../../actions/states/services/models/social-link.model';

@Component({
  selector: 'app-delete-link',
  templateUrl: './delete-link.component.html',
  styleUrls: ['./delete-link.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    CommonModule
  ]
})
export class DeleteSocialLinkComponent implements OnInit {
    visible: boolean = true;
  
    constructor(
      private store: Store,
      private authService: AuthService,
      private toastr: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: SocialLink | null,
      private dialogRef: MatDialogRef<DeleteSocialLinkComponent>
    ) {}
  
    ngOnInit(): void {}
  
    onCancel(): void {
      this.dialogRef.close();
    }
  
    onDelete(): void {
      if (this.data && this.data.id) {
        const linkId = this.data.id;
        this.store.dispatch(new DeactivateSocialLink(linkId)).subscribe(() => {
          this.toastr.success('Social Media Deleted Succesfully.', 'Success');
          const userId = this.authService.getUserIdFromToken();
          this.store.dispatch(new LoadSocialLinks(userId));
          this.dialogRef.close();
          this.visible = false;
        });
      }
    }
  
    onClose(): void {
      this.dialogRef.close();
      this.visible = false;
    }
  }