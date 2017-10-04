import { Source } from "./source";

/**
 *  Initials source impelementation.
 *  return the initals of the given value
 * 
 * @export
 * @class Value
 * @implements {Source}
 */
export class Initials implements Source {
  readonly sourceType: string = "INITIALS";

  constructor(public sourceId: string) {
  }

  getAvatar(initialsSize: number): string {
    return this._getInitials(this.sourceId, initialsSize);
  }

  _getInitials(name: string, size: number): string {
    if (name) {
      let initials = name.split(" ");
      if (size && size < initials.length) {
        return this._constructInitials(initials.slice(0, size));
      } else {
        return this._constructInitials(initials);
      }

    }
    return "";
  }

  _constructInitials(elements: string[]) {
    if (elements && elements.length > 0) {
      return elements.map(element => element[0].toUpperCase()).join('');
    }
    return '';
  }
}