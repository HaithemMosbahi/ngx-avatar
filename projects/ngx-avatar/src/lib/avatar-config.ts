import { AvatarSource } from "./sources/avatar-source.enum";

/**
 * Represents avatar configuration object
 */
export interface AvatarConfig {
  colors?: string[];

  sourcePriorityOrder?: AvatarSource[];
}
