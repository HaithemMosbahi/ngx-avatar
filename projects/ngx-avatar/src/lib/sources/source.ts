import { AvatarSource } from './avatar-source.enum';

/**
 * Contract of all Sources.
 * Every source must implements the fetch method
 * in order to provide the avatar source.
 */
export interface Source {
  /**
   * The avatar source type (Facebook, Twitter, etc.).
   */
  readonly sourceType: AvatarSource;

  /**
   * The avatar id in which it's source recognizes it.
   */
  sourceId: string;

  /**
   * Gets the avatar that usually is a URL, but,
   * for example it can also be a string of initials from the name.
   */
  getAvatar(size: number): string;
}
