import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { AVATAR_CONFIG } from "./avatar-config.token";
import { AvatarConfig } from "./avatar-config";
import { Injectable, Inject, Optional } from "@angular/core";
import { AvatarSource } from "./sources/avatar-source.enum";
import { Source } from "./sources/source";

/**
 * list of Supported avatar sources
 */
const defaultSources = [
  AvatarSource.FACEBOOK,
  AvatarSource.GOOGLE,
  AvatarSource.TWITTER,
  AvatarSource.VKONTAKTE,
  AvatarSource.SKYPE,
  AvatarSource.GRAVATAR,
  AvatarSource.GITHUB,
  AvatarSource.CUSTOM,
  AvatarSource.INITIALS,
  AvatarSource.VALUE
];

/**
 * list of default colors
 */
const defaultColors = [
  "#1abc9c",
  "#3498db",
  "#f1c40f",
  "#8e44ad",
  "#e74c3c",
  "#d35400",
  "#2c3e50",
  "#7f8c8d"
];

/**
 * Provides utilities methods related to Avatar component
 */
@Injectable()
export class AvatarService {
  constructor(
    @Optional()
    @Inject(AVATAR_CONFIG)
    private avatarConfig: AvatarConfig,
    private http: HttpClient
  ) {}

  public fetchAvatar(avatarUrl: string): Observable<any> {
    return this.http.get(avatarUrl);
  }

  public getSources(): AvatarSource[] {
    return defaultSources;
  }

  /**
   * Get a random color.
   * The color is based on the ascii code of the given value.
   * This will guarantee that avatars with the same value
   * will have the same background color
   *
   * returns {string}
   */
  public getRandomColor(avatarText: string): string {
    if (!avatarText) {
      return 'transparent';
    }
    const asciiCodeSum = this.calculateAsciiCode(avatarText);
    const colors = this.getAvatarColors();
    return colors[asciiCodeSum % colors.length];
  }

  public getAvatarColors(): string[] {
    if (
      this.avatarConfig &&
      this.avatarConfig.colors &&
      this.avatarConfig.colors.length > 0
    ) {
      return this.avatarConfig.colors;
    }
    return defaultColors;
  }

  public copmareSources(source1: Source, source2: Source): number {
    return this.getSourcePriority(source1.sourceType)
          - this.getSourcePriority(source1.sourceType)
  }

  /**
     * Get source priority
     * Facebook has the highest priority, Value has the lowest
     * param source
     * param avatarSources
     return colors[asciiCodeSum % colors.length];
   */
  public getSourcePriority(sourceType: AvatarSource) {
    return this.getSources().indexOf(sourceType);
  }

  public isSource(source: string): boolean {
    if(!(source in AvatarSource)) {
      return false;
    }
    return this.getSources().includes(source as AvatarSource);
  }

  /**
   * Check wether the type of avatar is text or not.
   *
   * export
   * param {string} sourceType
   * returns {boolean}
   */
  public isTextAvatar(sourceType: AvatarSource): boolean {
    return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
  }

  /**
   * return the sum of ascii code of the given string
   * param value
   */
  private calculateAsciiCode(value: string): number {
    return value
      .split('')
      .map(letter => letter.charCodeAt(0))
      .reduce((previous, current) => previous + current);
  }
}
