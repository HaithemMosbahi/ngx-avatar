import { Source } from './source';
/**
 *  Facebook source impelementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
export class Facebook implements Source {
  readonly sourceType: string = 'FACEBOOK';

  constructor(public sourceId: string) {
  }

  getAvatar(size: number): string {
    return 'https://graph.facebook.com/' +
      `${this.sourceId}/picture?width=${size}&height=${size}`;
  }
}
