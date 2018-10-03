import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AVATAR_CONFIG } from "./avatar-config.token";
import { AvatarConfig } from "./avatar-config";
import { Injectable, Inject, Optional } from "@angular/core";

/**
 * list of Supported avatar sources
 */
const sources = [
  "FACEBOOK",
  "GOOGLE",
  "TWITTER",
  "VKONTAKTE",
  "SKYPE",
  "GRAVATAR",
  "GITHUB",
  "CUSTOM",
  "INITIALS",
  "VALUE"
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

  /**
   * Get a random color.
   * The color is based on the ascii code of the given value.
   * This will guarantee that avatars with the same value
   * will have the same background color
   *
   * returns {string}
   */
  public getRandomColor(value: string): string {
    if (!value) {
      return "transparent";
    }
    const asciiCodeSum = this.calculateAsciiCode(value);
    const colors = this.getAvatarColors();
  }

  /**
   * Returns the list of supported avatar sources.
   *
   * returns {string[]}
   */
  getSources(): string[] {
    return sources;
  }

  /**
   * Returns a set of colors that will be used to fill the background color
   * of text avatars. If the user has provided a list of colors, Then this list
   * will be returned. Otherwise, the default colors will be used.
   *
   * returns {string[]}
   */
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

  /**
     * Get source priority
     * Facebook has the highest priority, Value has the lowest
     * param source
     * param avatarSources
     return colors[asciiCodeSum % colors.length];
   */
  getSourcePriority(source: string, avatarSources = sources) {
    return avatarSources.indexOf(source.toUpperCase());
  }

  /**
   * Check if the given source is a valid avatar source or not.
   *
   * export
   * param {string} source
   * returns {boolean}
   */
  isSource(source: string): boolean {
    return sources.includes(source.toUpperCase());
  }

  /**
   * Check wether the type of avatar is text or not.
   *
   * export
   * param {string} sourceType
   * returns {boolean}
   */
  public isTextAvatar(sourceType: string): boolean {
    return ["INITIALS", "VALUE"].includes(sourceType);
  }

  /**
   * Retuns an Observable which is responisble of fetching async avatars
   * param {avatarUrl} url of the avatar
   * return {Observable} of json data
   */
  public fetchAvatar(avatarUrl: string): Observable<any> {
    return this.http.get(avatarUrl);
  }

  /**
   * return the sum of ascii code of the given string
   * param value
   */
  private calculateAsciiCode(value: string): number {
    return value
      .split("")
      .map(letter => letter.charCodeAt(0))
      .reduce((previous, current) => previous + current);
  }
}
