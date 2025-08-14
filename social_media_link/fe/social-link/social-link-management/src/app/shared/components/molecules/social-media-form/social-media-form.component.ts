import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddSocialLinkPayload, SocialLink } from '../../../actions/states/services/models/social-link.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddSocialLink, LoadSocialLinks, UpdateSocialLink } from '../../../states/actions/social-link.actions';
import { AuthService } from '../../../../core/guard/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LinkValidatorDirective } from '../../../directives/link-validator.directive';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LinkValidatorDirective
  ]})
export class SocialMediaFormComponent implements OnInit {
  socialMediaForm: FormGroup;
  visible: boolean = true;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: SocialLink | null,
    private dialogRef: MatDialogRef<SocialMediaFormComponent>
  ) {
    this.socialMediaForm = this.fb.group({
      social_media_link: ['', Validators.required],
      social_media_name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.socialMediaForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.socialMediaForm.valid) {
      const formValues = this.socialMediaForm.value;
      const userId = this.authService.getUserIdFromToken();
      
      const request: AddSocialLinkPayload = {
        id: this.data?.id,
        social_media_name: formValues.social_media_name,
        social_media_link: formValues.social_media_link,
        description: formValues.description
      };

      const action = this.data && this.data.id ? new UpdateSocialLink(request) : new AddSocialLink(request);
      const successMessage = this.data && this.data.id ? 'Social media link updated successfully.' : 'Social media link added successfully.';
      
      this.store.dispatch(action).subscribe(() => {
        this.toastr.success(successMessage, 'Success');
        this.store.dispatch(new LoadSocialLinks(userId));
        this.dialogRef.close();
      });
    }
  }

  onClear(): void {
    this.socialMediaForm.reset();
  }

  onClose(): void {
    this.dialogRef.close();
    this.visible = false;
  }
}
