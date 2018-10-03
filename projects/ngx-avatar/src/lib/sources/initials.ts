import { Source } from "./source";

/**
 *  Initials source impelementation.
 *  return the initals of the given value
 */
export class Initials implements Source {
  readonly sourceType: string = "INITIALS";

  constructor(public sourceId: string) {}

  public getAvatar(initialsSize: number): string {
    return this.getInitials(this.sourceId, initialsSize);
  }

  private getInitials(name: string, size: number): string {
    if (!name) {
      return '';
    }
    const initials = name.trim().split(" ");
    if (size && size < initials.length) {
      return this.constructInitials(initials.slice(0, size));
    } else {
      return this.constructInitials(initials);
    }
  }

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
