import { Source } from './source';

/**
 * Contract of all async sources.
 * Every async source must implement the processResponse method that extracts the avatar url from the data
 */
export abstract class AsyncSource implements Source {
  readonly sourceType: string;

  constructor(public sourceId: string) { }

  abstract getAvatar(size?: number): string;
  abstract processResponse(data: any, size?: number): string;

}
