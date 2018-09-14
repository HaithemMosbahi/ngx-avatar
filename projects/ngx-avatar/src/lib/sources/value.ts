import { Source } from './source';

/**
 *  Value source impelementation.
 *  return the value as avatar
 */
export class Value implements Source {
  readonly sourceType: string = 'VALUE';

  constructor(public sourceId: string) {
  }

  getAvatar(): string {
    return this.sourceId;
  }
}
