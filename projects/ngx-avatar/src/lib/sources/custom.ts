import { Source } from './source';
/**
 *  Custom source impelementation.
 *  return custom image as an avatar
 *
 */
export class Custom implements Source {
  readonly sourceType: string = 'CUSTOM';

  constructor(public sourceId: string) {
  }

  getAvatar(): string {
    return this.sourceId;
  }
}
