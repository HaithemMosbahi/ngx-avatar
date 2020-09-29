import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AvatarConfigService } from './avatar-config.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { Source } from './sources/source';

/**
 * list of Supported avatar sources
 */
export const defaultSources = [
  AvatarSource.FACEBOOK,
  AvatarSource.GOOGLE,
  AvatarSource.TWITTER,
  AvatarSource.INSTAGRAM,
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
export const defaultColors = [
  '#1abc9c',
  '#3498db',
  '#f1c40f',
  '#8e44ad',
  '#e74c3c',
  '#d35400',
  '#2c3e50',
  '#7f8c8d'
];

/**
 * Provides utilities methods related to Avatar component
 */
@Injectable()
export class AvatarService {
  public avatarSources: AvatarSource[] = defaultSources;
  public avatarColors: string[] = defaultColors;

  private readonly failedSources = new Map<string, Source>();

  constructor(
    private http: HttpClient,
    private avatarConfigService: AvatarConfigService
  ) {
    this.overrideAvatarSources();
    this.overrideAvatarColors();
  }

  public fetchAvatar(avatarUrl: string): Observable<unknown> {
    return this.http.get(avatarUrl);
  }

  public getRandomColor(avatarText: string): string {
    if (!avatarText) {
      return 'transparent';
    }
    const asciiCodeSum = this.calculateAsciiCode(avatarText);
    return this.avatarColors[asciiCodeSum % this.avatarColors.length];
  }

  public compareSources(
    sourceType1: AvatarSource,
    sourceType2: AvatarSource
  ): number {
    return (
      this.getSourcePriority(sourceType1) - this.getSourcePriority(sourceType2)
    );
  }

  public isSource(source: string): boolean {
    return this.avatarSources.includes(source as AvatarSource);
  }

  public isTextAvatar(sourceType: AvatarSource): boolean {
    return [AvatarSource.INITIALS, AvatarSource.VALUE].includes(sourceType);
  }

  private buildSourceKey(source: Source): string {
    return source.sourceType + '-' + source.sourceId;
  }

  public sourceHasFailedBefore(source: Source): boolean {
    return this.failedSources.has(this.buildSourceKey(source));
  }

  public markSourceAsFailed(source: Source): void {
    this.failedSources.set(this.buildSourceKey(source), source);
  }

  private overrideAvatarSources(): void {
    this.avatarSources = this.avatarConfigService.getAvatarSources(
      defaultSources
    );
  }

  private overrideAvatarColors(): void {
    this.avatarColors = this.avatarConfigService.getAvatarColors(defaultColors);
  }

  private calculateAsciiCode(value: string): number {
    return value
      .split('')
      .map(letter => letter.charCodeAt(0))
      .reduce((previous, current) => previous + current);
  }

  private getSourcePriority(sourceType: AvatarSource) {
    return this.avatarSources.indexOf(sourceType);
  }
}
