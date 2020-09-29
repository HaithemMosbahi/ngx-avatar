import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';

/**
 *  Instagram source impelementation.
 *  Fetch avatar source based on instagram identifier
 */
export class Instagram extends AsyncSource {
  readonly sourceType: AvatarSource = AvatarSource.INSTAGRAM;

  constructor(sourceId: string) {
    super(sourceId);
  }

  public getAvatar(): string {
    return `https://www.instagram.com/${this.sourceId}/?__a=1`;
  }

  /**
   * extract instagram avatar from json data
   */
  public processResponse(data: { graphql: { user: { profile_pic_url_hd: string } } }, size?: number): string {
    return `${data.graphql.user.profile_pic_url_hd}&s=${size}`;
  }
}
