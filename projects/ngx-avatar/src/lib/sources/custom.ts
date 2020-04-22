import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Custom source impelementation.
 *  return custom image as an avatar
 *
 */
export class Custom implements Source {
  readonly sourceType: AvatarSource = AvatarSource.CUSTOM;

  constructor(public sourceId: string) {}

  public getAvatar(): string {
    return this.sourceId;
  }
}
