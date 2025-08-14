import { AddSocialLinkPayload } from "../../actions/states/services/models/social-link.model";

export class LoadSocialLinks {
    static readonly type = '[SocialLink] Load Social Links';
    constructor(public userId: number) {}
  }

  export class AddSocialLink {
    static readonly type = '[SocialLink] Add';
    constructor(public payload: AddSocialLinkPayload) {}
  }

  export class UpdateSocialLink {
    static readonly type = '[SocialLink] Update';
    constructor(public payload: AddSocialLinkPayload) {}
  }

  export class DeactivateSocialLink {
    static readonly type = '[SocialLink] Deactivate';
    constructor(public linkId: number) {}
  }