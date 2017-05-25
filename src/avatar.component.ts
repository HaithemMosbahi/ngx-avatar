import { Component, Input, OnInit } from '@angular/core';
import { Source } from "./sources/source";
import { Facebook } from "./sources/facebook";
import { Twitter } from "./sources/twitter";
import { Google } from "./sources/google";
import { Custom } from "./sources/custom";
import { Initials } from "./sources/initials";
import { Gravatar } from "./sources/gravatar";
import { Skype } from "./sources/skype";
import { Value } from "./sources/value";
import * as utils from "./sources/utils";

/**
 * Universal avatar component that
 * generates avatar from different sources
 * 
 * @export 
 * @class AvatarComponent
 * @implements {OnInit} 
 */

@Component({
  selector: 'ng-avatar',
  styles: [`
  :host{
    display:inline-block;
    border-radius: "50%";
  }
  `],
  template: `
    <div  [ngStyle]="hostStyle">
    <img *ngIf="src"
      [src]="src"
      [width]="size"
      [height]="size"
      [ngStyle]="avatarStyle"
      (error)="fetch($event)"
     />

   <div *ngIf="!src"
     [ngStyle]="avatarStyle">{{data}}</div>
   </div>`})
export class AvatarComponent implements OnInit {

  @Input() round: boolean = true;
  @Input() size: number = 50;
  @Input() textSizeRatio: number = 3;
  @Input() bgColor: string = "transparent";
  @Input() fgColor: string = "#FFF";
  @Input() borderColor: string;
  @Input() style: any={};

  _currentSource: number = 0;
  _sources: Source[] = Array();
  // avatar img src
  src: string;
  // avatar text value
  data: string;

  avatarStyle: any = {}
  hostStyle: any = {};

  constructor() {
  }

  /**
   * Init Avatar component
   * 
   * @memberOf AvatarComponent
   */
  ngOnInit() {

    if (this._sources.length > 0 && this._sources[this._currentSource]) {
      // Order sources array by source priority
      this._sources.sort((leftSide, rightSide) => {
        return utils.getSourcePriority(leftSide.sourceId) - utils.getSourcePriority(rightSide.sourceId);
      });
      // Host style 
      this.hostStyle = {
        display: 'inline-block',
        width: this.size + 'px',
        height: this.size + 'px',
        ...this.style
      }
      // Fetch avatar source
      this.fetch();
    } else {
       console.error("ng-avatar : No avatar source has been provided");
    }
  }


  @Input('facebookId')
  set facebookId(value: string) {
    this._sources.push(new Facebook(value));

  }

  @Input('twitterId')
  set twitterId(value: string) {
    this._sources.push(new Twitter(value));

  }

  @Input('googleId')
  set googleId(value: string) {
    this._sources.push(new Google(value));
  }

  @Input('skypeId')
  set skypeId(value: string) {
    this._sources.push(new Skype(value));

  }

  @Input('gravatarId')
  set gravatarId(value: string) {
    this._sources.push(new Gravatar(value));
  }

  @Input('custom')
  set customImage(value: string) {
    this._sources.push(new Custom(value));
  }

  @Input('name')
  set name(value: string) {
    this._sources.push(new Initials(value));
  }

  @Input('value')
  set value(value: string) {
    this._sources.push(new Value(value));

  }


  /**
   * Fetch avatar source
   * 
   * @param {any} event 
   * 
   * @memberOf AvatarComponent
   */
  fetch(event?: any) {
    if (this._sources[this._currentSource].sourceType == "INITIALS" ||
      this._sources[this._currentSource].sourceType == "VALUE") {
      this.data = this._sources[this._currentSource].getAvatar();
      this.src = undefined;
      this.avatarStyle = this._initialsStyle();

    } else {
      this.avatarStyle = this._imageStyle()
      this.src = this._sources[this._currentSource].getAvatar(this.size);

    }
    this._currentSource++;


  }

 /**
  * 
  * @returns initials style
  * 
  * @memberOf AvatarComponent
  */
  _initialsStyle() {
    return {
      textAlign: 'center',
      borderRadius: this.round ? '100%' : '0%',
      textTransform: 'uppercase',
      color: this.fgColor,
      backgroundColor: this.bgColor ? this.bgColor : utils.getRandomColor(),
      font: Math.floor(this.size / this.textSizeRatio) + 'px Helvetica, Arial, sans-serif',
      lineHeight: this.size + 'px',
      ...this.hostStyle
    }

  }
 
 /**
  * 
  * @returns image style
  * 
  * @memberOf AvatarComponent
  */
  _imageStyle() {
    return {
      maxWidth: '100%',
      borderRadius: this.round ? '50%' : '0%',
      width: this.size,
      height: this.size,
    }
  }

}
