import { Source } from './source';
/**
 *  Skype source impelementation.
 *  Fetch avatar source based on skype identifier
 */
export class Skype implements Source {
  readonly sourceType: string = 'SKYPE';

  constructor(public sourceId: string) {
  }

  getAvatar(): string {
    return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
  }
}
