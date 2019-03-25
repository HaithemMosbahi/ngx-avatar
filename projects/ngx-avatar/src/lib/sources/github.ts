import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';

/**
 *  Github source impelementation.
 *  Fetch avatar source based on github identifier
 */
export class Github extends AsyncSource {
  readonly sourceType: AvatarSource = AvatarSource.GITHUB;

  constructor(sourceId: string) {
    super(sourceId);
  }

  public getAvatar(): string {
    return `https://api.github.com/users/${this.sourceId}`;
  }

  /**
   * extract github avatar from json data
   */
  public processResponse(data: any, size?: number): string {
    if (size) {
      return `${data.avatar_url}&s=${size}`;
    }
    return data.avatar_url;
  }
}
