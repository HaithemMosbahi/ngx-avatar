import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Skype source implementation.
 *  Fetch avatar source based on skype identifier
 */
export class Skype implements Source {
  readonly sourceType: AvatarSource = AvatarSource.SKYPE;

  constructor(public sourceId: string) {}

  public getAvatar(): string {
    return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
  }
}
