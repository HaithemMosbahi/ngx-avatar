import { AvatarSource } from './sources/avatar-source.enum';

/**
 * Represents avatar configuration object.
 */
export interface AvatarConfig {
  /**
   * The avatars colors.
   */
  colors?: string[];

  /**
   * The order in which the avatar sources will be used.
   */
  sourcePriorityOrder?: AvatarSource[];
}
