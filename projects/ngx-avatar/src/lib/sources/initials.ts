import { Source } from './source';

/**
 *  Initials source impelementation.
 *  return the initals of the given value
 */
export class Initials implements Source {
  readonly sourceType: string = 'INITIALS';

  constructor(public sourceId: string) {
  }

  getAvatar(initialsSize: number): string {
    return this._getInitials(this.sourceId, initialsSize);
  }

  _getInitials(name: string, size: number): string {
    if (name) {
      const initials = name.trim().split(' ');
      if (size && size < initials.length) {
        return this._constructInitials(initials.slice(0, size));
      } else {
        return this._constructInitials(initials);
      }

    }
    return '';
  }

  _constructInitials(elements: string[]) {
    if (elements && elements.length > 0) {
      return elements.filter(element => element && element.length > 0)
        .map(element => element[0].toUpperCase()).join('');
    }
    return '';
  }
}
