import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { UserState } from './app/shared/states/user.state';
import { SocialLinkState } from './app/shared/states/social-link.state';
import { provideStore } from '@ngxs/store';
import { AuthGuard } from './app/core/guard/auth.guard';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app/app.routes';
import { AuthService } from './app/core/guard/auth.service';
import { AuthInterceptor } from './app/shared/interceptors/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LinkValidatorDirective } from './app/shared/directives/link-validator.directive';
import { UppercaseSocialPipe } from './app/shared/pipes/uppercase-social.pipe';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      CommonModule,
      ReactiveFormsModule, 
      LinkValidatorDirective,
      UppercaseSocialPipe
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideStore([UserState, SocialLinkState]),
    AuthService,
    provideRouter(routes),
    AuthGuard,
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));