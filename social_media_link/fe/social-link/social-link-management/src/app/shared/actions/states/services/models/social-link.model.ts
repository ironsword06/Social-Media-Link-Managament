export interface SocialLink {
    id?: number;
    user_id: number;
    username?:string;
    social_media_name: string;
    social_media_link: string;
    description?: string;
    isActive: boolean;
    updated_at: Date;
    updated_by_role_id: number;
  }
  
export interface AddSocialLinkPayload {
  id?: number;
  social_media_name: string;
  social_media_link: string;
  description?: string;
}