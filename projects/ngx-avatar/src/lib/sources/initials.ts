import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';

/**
 * Initials source implementation.
 * return the initials of the given value
 */
export class Initials implements Source {
  readonly sourceType: AvatarSource = AvatarSource.INITIALS;

  constructor(public sourceId: string) {}

  public getAvatar(size: number): string {
    return this.getInitials(this.sourceId, size);
  }

  /**
   * Returns the initial letters of a name in a string.
   */
  private getInitials(name: string, size: number): string {
    name = name.trim();

    if (!name) {
      return '';
    }

    const initials = name.split(' ');

    if (size && size < initials.length) {
      return this.constructInitials(initials.slice(0, size));
    } else {
      return this.constructInitials(initials);
    }
  }

  /**
   * Iterates a person's name string to get the initials of each word in uppercase.
   */
  private constructInitials(elements: string[]): string {
    if (!elements || !elements.length) {
      return '';
    }

    return elements
      .filter(element => element && element.length > 0)
      .map(element => element[0].toUpperCase())
      .join('');
  }
}
