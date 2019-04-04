import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';

import { Source } from './sources/source';
import { AsyncSource } from './sources/async-source';
import { SourceFactory } from './sources/source.factory';
import { AvatarService } from './avatar.service';
import { AvatarSource } from './sources/avatar-source.enum';
import { takeWhile, map } from 'rxjs/operators';

/**
 * Universal avatar component that
 * generates avatar from different sources
 *
 * export
 * class AvatarComponent
 * implements {OnChanges}
 */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-avatar',
  styles: [
    `
      :host {
        border-radius: '50%';
      }
    `
  ],
  template: `
    <div
      (click)="onAvatarClicked()"
      class="avatar-container"
      [ngStyle]="hostStyle"
    >
      <img
        *ngIf="avatarSrc; else textAvatar"
        [src]="avatarSrc"
        [width]="size"
        [height]="size"
        [ngStyle]="avatarStyle"
        (error)="fetchAvatarSource()"
        class="avatar-content"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content" [ngStyle]="avatarStyle">
          {{ avatarText }}
        </div>
      </ng-template>
    </div>
  `
})
export class AvatarComponent implements OnChanges, OnDestroy {
  @Input()
  public round = true;
  @Input()
  public size = 50;
  @Input()
  public textSizeRatio = 3;
  @Input()
  public bgColor: string;
  @Input()
  public fgColor = '#FFF';
  @Input()
  public borderColor: string;
  @Input()
  public style: any = {};
  @Input()
  public cornerRadius = 0;
  @Input('facebookId')
  public facebook: string;
  @Input('twitterId')
  public twitter: string;
  @Input('googleId')
  public google: string;
  @Input('vkontakteId')
  public vkontakte: string;
  @Input('skypeId')
  public skype: string;
  @Input('gravatarId')
  public gravatar: string;
  @Input('githubId')
  public github: string;
  @Input('src')
  public custom: string;
  @Input('name')
  public initials: string;
  @Input('value')
  public value: string;
  @Input('placeholder')
  public placeholder: string;
  @Input('initialsSize')
  public initialsSize: number;

  @Output()
  public clickOnAvatar: EventEmitter<Source> = new EventEmitter<Source>();

  public isAlive = true;
  public avatarSrc: string | null = null;
  public avatarText: string | null = null;
  public avatarStyle: any = {};
  public hostStyle: any = {};

  private currentIndex = -1;
  private sources: Source[] = [];

  constructor(
    public sourceFactory: SourceFactory,
    private avatarService: AvatarService
  ) {}

  public onAvatarClicked(): void {
    this.clickOnAvatar.emit(this.sources[this.currentIndex]);
  }

  /**
   * Detect inputs change
   *
   * param {{ [propKey: string]: SimpleChange }} changes
   *
   * memberof AvatarComponent
   */
  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (this.avatarService.isSource(propName)) {
        const sourceType = AvatarSource[propName.toUpperCase()];
        if (changes[propName].currentValue) {
          const currentValue = changes[propName].currentValue;
          this.addSource(sourceType, currentValue);
        } else {
          this.removeSource(sourceType);
        }
      }
    }
    // reinitialize the avatar component when a source property value has changed
    // the fallback system must be re-invoked with the new values.
    this.initializeAvatar();
  }

  /**
   * Fetch avatar source
   *
   * param {any} event
   *
   * memberOf AvatarComponent
   */
  public fetchAvatarSource(): void {
    const previousSource = this.sources[this.currentIndex];
    if (previousSource) {
      this.avatarService.markSourceAsFailed(previousSource);
    }

    const source = this.findNextSource();
    if (!source) {
      return;
    }

    if (this.avatarService.isTextAvatar(source.sourceType)) {
      this.buildTextAvatar(source);
      this.avatarSrc = null;
    } else {
      this.buildImageAvatar(source);
    }
  }

  private findNextSource(): Source | null {
    while (++this.currentIndex < this.sources.length) {
      const source = this.sources[this.currentIndex];
      if (source && !this.avatarService.sourceHasFailedBefore(source)) {
        return source;
      }
    }

    return null;
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  /**
   * Initialize the avatar component and its fallback system
   */
  private initializeAvatar(): void {
    this.currentIndex = -1;
    if (this.sources.length > 0) {
      this.sortAvatarSources();
      this.fetchAvatarSource();
      this.hostStyle = {
        width: this.size + 'px',
        height: this.size + 'px'
      };
    }
  }

  private sortAvatarSources(): void {
    this.sources.sort((source1, source2) =>
      this.avatarService.compareSources(source1.sourceType, source2.sourceType)
    );
  }

  private buildTextAvatar(avatarSource: Source): void {
    this.avatarText = avatarSource.getAvatar(this.initialsSize);
    this.avatarStyle = this.getInitialsStyle(avatarSource.sourceId);
  }

  private buildImageAvatar(avatarSource: Source): void {
    this.avatarStyle = this.getImageStyle();
    if (avatarSource instanceof AsyncSource) {
      this.fetchAndProcessAsyncAvatar(avatarSource);
    } else {
      this.avatarSrc = avatarSource.getAvatar(this.size);
    }
  }

  /**
   *
   * returns initials style
   *
   * memberOf AvatarComponent
   */
  private getInitialsStyle(avatarValue: string): void {
    return {
      textAlign: 'center',
      borderRadius: this.round ? '100%' : this.cornerRadius + 'px',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      textTransform: 'uppercase',
      color: this.fgColor,
      backgroundColor: this.bgColor
        ? this.bgColor
        : this.avatarService.getRandomColor(avatarValue),
      font:
        Math.floor(this.size / this.textSizeRatio) +
        'px Helvetica, Arial, sans-serif',
      lineHeight: this.size + 'px',
      ...this.style
    };
  }

  /**
   *
   * returns image style
   *
   * memberOf AvatarComponent
   */
  private getImageStyle(): void {
    return {
      maxWidth: '100%',
      borderRadius: this.round ? '50%' : this.cornerRadius + 'px',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      width: this.size,
      height: this.size,
      ...this.style
    };
  }
  /**
   * Fetch avatar image asynchronously.
   *
   * param {Source} source represents avatar source
   * memberof AvatarComponent
   */
  private fetchAndProcessAsyncAvatar(source: AsyncSource): void {
    if (this.avatarService.sourceHasFailedBefore(source)) {
      return;
    }

    this.avatarService
        .fetchAvatar(source.getAvatar(this.size))
        .pipe(
            takeWhile(() => this.isAlive),
            map(response => source.processResponse(response, this.size)),
        )
        .subscribe(
            avatarSrc => (this.avatarSrc = avatarSrc),
            err => {
              this.avatarService.markSourceAsFailed(source);
            },
        );
  }

  /**
   * Add avatar source
   *
   * param sourceType avatar source type e.g facebook,twitter, etc.
   * param sourceValue  source value e.g facebookId value, etc.
   */
  private addSource(sourceType: AvatarSource, sourceValue: string): void {
    if (!this.isSourceExist(sourceType)) {
      this.sources.push(
        this.sourceFactory.newInstance(sourceType, sourceValue)
      );
    } else {
      const index = this.sources.findIndex(
        source => source.sourceType === sourceType
      );
      this.sources[index].sourceId = sourceValue;
    }
  }

  /**
   * Remove avatar source
   *
   * param sourceType avatar source type e.g facebook,twitter, etc.
   */
  private removeSource(sourceType: AvatarSource): void {
    if (this.isSourceExist(sourceType)) {
      const index = this.sources.findIndex(
        source => source.sourceType === sourceType
      );
      this.sources.splice(index, 1);
    }
  }

  private isSourceExist(avatarSource: AvatarSource): boolean {
    return this.sources.some(source => source.sourceType === avatarSource);
  }
}
