import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';

/**
 *  Value source implementation.
 *  return the value as avatar
 */
export class Value implements Source {
  readonly sourceType: AvatarSource = AvatarSource.VALUE;

  constructor(public sourceId: string) {}

  public getAvatar(): string {
    return this.sourceId;
  }
}
