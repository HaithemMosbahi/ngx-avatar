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
    readonly isAsync = false;

    constructor(public sourceId: string) {
    }

    getAvatar(): string {
        return this._getInitials(this.sourceId);
    }

     _getInitials(name: string): string {
    let result = "";
    if (name) {
      name.split(" ").forEach(element => {
        result += element[0].toUpperCase();
      });
    }
    return result;
  }
}