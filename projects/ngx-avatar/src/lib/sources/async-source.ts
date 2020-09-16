import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';

/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 */
export abstract class AsyncSource implements Source {
  readonly abstract sourceType: AvatarSource;

  constructor(public sourceId: string) {}

  abstract getAvatar(size: number): string;
  abstract processResponse(data: unknown, size?: number): string | null;
}
