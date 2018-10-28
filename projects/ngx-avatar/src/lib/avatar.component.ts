import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChange,
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
    <div (click)="onAvatarClicked()" class="avatar-container" [ngStyle]="hostStyle">
      <img *ngIf="avatarSrc; else textAvatar"
        [src]="avatarSrc"
        [width]="size"
        [height]="size"
        [ngStyle]="avatarStyle"
        (error)="fetchAvatarSource($event)"
        class="avatar-content"
      />
      <ng-template #textAvatar>
        <div *ngIf="avatarText" class="avatar-content"
          [ngStyle]="avatarStyle">
            {{avatarText}}
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
  public clickOnAvatar: EventEmitter<any> = new EventEmitter<any>();

  public isAlive = true;
  public avatarSrc: string;
  public avatarText: string;
  public avatarStyle: any = {};
  public hostStyle: any = {};

  private currentSource = 0;
  private sources: Source[] = Array();

  constructor(
    public elementRef: ElementRef,
    public sourceFactory: SourceFactory,
    private avatarService: AvatarService
  ) {}

  public onAvatarClicked(): void {
    this.clickOnAvatar.emit(this.sources[this.currentSource - 1]);
  }

  /**
   * Detect inputs change
   *
   * param {{ [propKey: string]: SimpleChange }} changes
   *
   * memberof AvatarComponent
   */
  public ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const propName in changes) {
      if (
        this.avatarService.isSource(propName) &&
        changes[propName].currentValue
      ) {
        console.log('yess');
        const currentValue = changes[propName].currentValue;
        this.addSource(AvatarSource[propName.toUpperCase()], currentValue);
      }
    }
    // reintialize the avatar component when a source property value has changed
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
  public fetchAvatarSource(event?: any): void {
    const avatarSource = this.sources[this.currentSource];
    if (!avatarSource) {
      return;
    }
    if (this.avatarService.isTextAvatar(avatarSource.sourceType)) {
      this.buildTextAvatar(avatarSource);
      // TODO: check if this is needed
      this.avatarSrc = undefined;
    } else {
      this.buildImageAvatar(avatarSource);
    }
    this.currentSource++;
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  /**
   * Initialize the avatar component and its fallback system
   */
  private initializeAvatar(): void {
    this.currentSource = 0;
    if (this.sources.length > 0 && this.sources[this.currentSource]) {
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
      this.avatarService.copmareSources(source1.sourceType, source2.sourceType)
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
   * Fetch avatar image asynchrounsly.
   *
   * param {Source} source represents avatar source
   * memberof AvatarComponent
   */
  private fetchAndProcessAsyncAvatar(source: AsyncSource): void {
    this.avatarService
      .fetchAvatar(source.getAvatar())
      .pipe(
        takeWhile(() => !this.isAlive),
        map(response => source.processResponse(response, this.size))
      )
      .subscribe(
        avatarSrc => (this.avatarSrc = avatarSrc),
        err => {
          console.error(
            `ngx-avatar: error while fetching ${source.sourceType} avatar `
          );
        }
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

  private isSourceExist(avatarSource: AvatarSource): boolean {
    return this.sources.map(source => source.sourceType).includes(avatarSource);
  }
}
