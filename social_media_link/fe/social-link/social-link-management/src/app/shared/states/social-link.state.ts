import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AddSocialLink, DeactivateSocialLink, LoadSocialLinks, UpdateSocialLink } from './actions/social-link.actions';
import { SocialLinkService } from '../actions/states/services/social-link.service';
import { SocialLink } from '../actions/states/services/models/social-link.model';

export interface SocialLinkStateModel {
  socialLinks: SocialLink[];
  loading: boolean;
  error: string | null;
}

@State<SocialLinkStateModel>({
  name: 'socialLink',
  defaults: {
    socialLinks: [],
    loading: false,
    error: null
  }
})
@Injectable()
export class SocialLinkState {
  constructor(private socialLinkService: SocialLinkService) {}

  @Selector()
  static getSocialLinks(state: SocialLinkStateModel): SocialLink[] {
    return state.socialLinks;
  }


  @Selector()
  static getError(state: SocialLinkStateModel): string | null {
    return state.error;
  }
  
  @Action(LoadSocialLinks)
  loadSocialLinks(ctx: StateContext<SocialLinkStateModel>, action: LoadSocialLinks) {
    ctx.patchState({ loading: true });
    return this.socialLinkService.getSocialLinks(action.userId).pipe(
      tap((socialLinks: SocialLink[]) => {
        localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
        ctx.patchState({ socialLinks, loading: false, error: null });
      }),
      catchError((error) => {
        ctx.patchState({ error: error.message, loading: false });
        return throwError(error);
      })
    );
  }

  @Action(AddSocialLink)
  addSocialLink({ getState, patchState }: StateContext<SocialLinkStateModel>, { payload }: AddSocialLink) {
    return this.socialLinkService.addSocialLink(payload).pipe(
      tap((newLink: SocialLink) => {
        const state = getState();
        patchState({
          socialLinks: [...state.socialLinks, newLink]
        });
      })
    );
  }
  
  @Action(UpdateSocialLink)
  updateSocialLink({ getState, patchState }: StateContext<SocialLinkStateModel>, { payload }: UpdateSocialLink) {
    const { id, ...linkData } = payload; 

    return this.socialLinkService.updateSocialLink(id, linkData).pipe(
      tap((updatedLink: SocialLink) => {
        const state = getState();
        const updatedLinks = state.socialLinks.map(l => l.id === id ? updatedLink : l);
        patchState({
          socialLinks: updatedLinks
        });
      })
    );
  }

  @Action(DeactivateSocialLink)
  deactivateSocialLink({ getState, patchState }: StateContext<SocialLinkStateModel>, { linkId }: DeactivateSocialLink) {
    return this.socialLinkService.deactivateSocialLink(linkId).pipe(
      tap(() => {
        const state = getState();
        const updatedLinks = state.socialLinks.map(link => 
          link.id === linkId ? { ...link, isActive: false } : link
        );
        patchState({ socialLinks: updatedLinks });
      })
    );
  }
}
