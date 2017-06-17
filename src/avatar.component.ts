import {
  Component, Input, OnInit, Output,
  EventEmitter, Renderer2, ElementRef, OnChanges, SimpleChange
} from '@angular/core';
import { Http } from "@angular/http";
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
  selector: 'ngx-avatar',
  styles: [`
  :host{
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

   <div *ngIf="!src && data"
     [ngStyle]="avatarStyle">{{data}}</div>
   </div>`
})
export class AvatarComponent implements OnInit, OnChanges {

  @Input() round: boolean = true;
  @Input() size: number = 50;
  @Input() textSizeRatio: number = 3;
  @Input() bgColor: string;
  @Input() fgColor: string = "#FFF";
  @Input() borderColor: string;
  @Input() style: any = {};
  @Input() cornerRadius: number = 0;
  @Output() clickOnAvatar: EventEmitter<any> = new EventEmitter<any>();

  _currentSource: number = 0;
  _sources: Source[] = Array();
  // avatar img src
  src: string;
  // avatar text value
  data: string;

  avatarStyle: any = {}
  hostStyle: any = {};

  constructor(public http: Http, public renderer: Renderer2, public elementRef: ElementRef) {
    // listen to click events on the root element
    this.renderer.listen(this.elementRef.nativeElement, "click", (event) => {
      this.clickOnAvatar.emit(this._sources[this._currentSource - 1]);
    });
  }

  /**
   * Init Avatar component
   * 
   * @memberOf AvatarComponent
   */
  ngOnInit() {

    //this._initializeAvatar();

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      if (utils.isSource(propName)) {
        let currentValue = changes[propName].currentValue;
        this._addSource(propName,currentValue);
      }

    }
    // reintialize the avatar component when a source property value has changed
    // the fallback system must be re-invoked with the new values.
    this._initializeAvatar()

  }

  /**
   * Initialize the avatar component and its fallback system
   */
  _initializeAvatar() {
    this._currentSource = 0;
    if (this._sources.length > 0 && this._sources[this._currentSource]) {
      // Order sources array by source priority
      this._sources.sort((leftSide, rightSide) => {
        return utils.getSourcePriority(leftSide.sourceId) - utils.getSourcePriority(rightSide.sourceId);
      });
      // Host style 
      this.hostStyle = {
        width: this.size + 'px',
        height: this.size + 'px',
        ...this.style
      }
      // Fetch avatar source
      this.fetch();
    }
  }


  @Input('facebookId')
  set facebook(value: string) {
  }

  @Input('twitterId')
  set twitter(value: string) {
  }

  @Input('googleId')
  set google(value: string) {
  }

  @Input('skypeId')
  set skype(value: string) {
  }

  @Input('gravatarId')
  set gravatar(value: string) {
  }

  @Input('src')
  set custom(value: string) {
  }

  @Input('name')
  set initials(value: string) {
  }

  @Input('value')
  set value(value: string) {
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
      this.avatarStyle = this._imageStyle();
      if (this._sources[this._currentSource].sourceType == "GOOGLE") {
        this._fetchGoogleAvatar(this._sources[this._currentSource]);
      } else {
        this.src = this._sources[this._currentSource].getAvatar(this.size);
      }

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
      borderRadius: this.round ? '100%' : this.cornerRadius + 'px',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
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
      borderRadius: this.round ? '50%' : this.cornerRadius + 'px',
      border: this.borderColor ? '1px solid ' + this.borderColor : '',
      width: this.size,
      height: this.size,
    }
  }

  _fetchGoogleAvatar(source: Source) {
    this.http.get(source.getAvatar()).subscribe(response => {
      const avatarSrc = response.json().entry.gphoto$thumbnail.$t;
      if (avatarSrc) {
        this.src = avatarSrc.replace('s64', 's' + this.size);;
      }
    },
      err => {
        console.error("ngx-avatar: error while fetching google avatar ");
      });
  }

  /**
   * Add avatar source
   * 
   * @param sourceType avatar source type e.g facebook,twitter, etc.
   * @param sourceValue  source value e.g facebookId value, etc.
   */
  _addSource(sourceType:string,sourceValue: string) {
    if (sourceValue) {
      if(!this._updateExistingSource(sourceType,sourceValue)){
        switch (sourceType) {
        case "facebook":
          this._sources.push(new Facebook(sourceValue));
          break;
        case "twitter":
          this._sources.push(new Twitter(sourceValue));
          break;
        case "skype":
          this._sources.push(new Skype(sourceValue));
          break;
        case "gravatar":
          this._sources.push(new Gravatar(sourceValue));
          break;
        case "google":
          this._sources.push(new Google(sourceValue));
          break;
        case "custom":
          this._sources.push(new Custom(sourceValue));
          break;
        case "value":
          this._sources.push(new Value(sourceValue));
          break;
        default:
          // initials
          this._sources.push(new Initials(sourceValue));
          break;
      }
      }
    }



  }
  /**
   * This method check wether an avatar source has been added. If so
   * the source value will be updated with the new value passed as
   * paramater.
   * It returns true if the source exists and update can be performed,
   * returns false if not found
   * 
   * @param {string} sourceType the type of the source
   * @param {string} sourceValue the new value of the source 
   * 
   * @memberof AvatarComponent
   */
  _updateExistingSource(sourceType:string,sourceValue:string){
    let sourceIndex = this._sources.findIndex((source) => source.sourceType === sourceType.toUpperCase());
    if(sourceIndex > -1){
      this._sources[sourceIndex].sourceId = sourceValue;
      return true;
    }
    return false;
  }

}
