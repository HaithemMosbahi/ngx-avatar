import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from "./avatar.service";
import { Source } from "./sources/source";
import { Facebook } from "./sources/facebook";
import { Twitter } from "./sources/twitter";
import { Google } from "./sources/google";
import { Custom } from "./sources/custom";
import { Initials } from "./sources/initials";
import { Gravatar } from "./sources/gravatar";
import { Skype } from "./sources/skype";
import { Value } from "./sources/value";




@Component({
  selector: 'ng-avatar',
  styles: [`
  :host{
    display:inline-block
    border-radius: "50%",
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
   </div>`,
  providers: [AvatarService]
})
export class AvatarComponent implements OnInit {

  @Input() round: boolean = true;
  @Input() size: number = 50;
  @Input() textSizeRatio: number = 3;
  @Input() bgColor: string;
  @Input() fgColor: string = "#FFF";
  @Input() borderColor: string;
  @Input() style: any;
  // avatar sources
  _facebookId: string;
  _googleId: string;
  _twitterId: string;
  _skypeId: string;
  _gravatarId: string;
  _customImage: string;
  _initials: string;
  _value: string;

  _currentSource: number = 0;
  _sources: Source[] = Array();
  _domains: Map<string, string>;
  counter: number = 0;

  src: string;
  // used for text
  data: string;

  renderAsImage: boolean = true;
  avatarStyle: any = {}
  hostStyle: any = {};

  constructor(public avatarService: AvatarService) {
  }

  ngOnInit() {

    this._sources.sort((leftSide, rightSide) => {
      return this.avatarService.getSourcePriority(leftSide.sourceId) - this.avatarService.getSourcePriority(rightSide.sourceId);
    });

  

    if (this._sources.find(element => { return element.sourceId === "initials" })) {
      console.log();
    }

    this.hostStyle = {
      display: 'inline-block',
      width: this.size + 'px',
      height: this.size + 'px',
      ...this.style
    }
   this.fetch();

  }

  get facebookId(): string {
    return this._facebookId;
  }

  @Input('facebookId')
  set facebookId(value: string) {
    this._facebookId = value;
    this._sources.push(new Facebook(this._facebookId));

  }

  get twitterId(): string {
    return this._twitterId;
  }

  @Input('twitterId')
  set twitterId(value: string) {
    this._twitterId = value;
    this._sources.push(new Twitter(this._twitterId));

  }

  get googleId(): string {
    return this._googleId;
  }

  @Input('googleId')
  set googleId(value: string) {
    this._googleId = value;
    this._sources.push(new Google(this._googleId));
  }

  get skypeId(): string {
    return this._skypeId;
  }

  @Input('skypeId')
  set skypeId(value: string) {
    this._skypeId = value;
    this._sources.push(new Skype(this._skypeId));

  }

  get gravatarId(): string {
    return this._gravatarId;
  }

  @Input('gravatarId')
  set gravatarId(value: string) {
    this._gravatarId = value;
    this._sources.push(new Gravatar(this._gravatarId));
  }

  get customImage(): string {
    return this._customImage;
  }

  @Input('custom')
  set customImage(value: string) {
    this._customImage = value;
    this._sources.push(new Custom(this._customImage));
  }

  get name(): string {
    return this._customImage;
  }

  @Input('name')
  set name(value: string) {
    this._initials = value;
    this._sources.push(new Initials(this._initials));
  }

  get value(): string {
    return this._value;
  }

  @Input('value')
  set value(data: string) {
    this._value = data;
    this._sources.push(new Initials(this._value));

  }


  /**
   * Fetch avatar source
   * 
   * @param {any} event 
   * 
   * @memberOf AvatarComponent
   */
  fetch(event?:any) {
    this.src = this._sources[this.counter].getAvatar(this.size);

    //this.renderAsImage = false;
    if (this._sources[this.counter].sourceType == "INITIALS" ||
      this._sources[this.counter].sourceType == "VALUE") {
      this.data = this._sources[this.counter].getAvatar();
      this._renderAsText();
      this.src = undefined;
    } else {
      this.src = this._sources[this.counter].getAvatar();
    }
    this.counter++;
    //this._value = "HM";
    //this._renderAsText();
  }


 


  updateUrl() {
    console.log("Fallback option");
  }


  _renderAsText() {
    let initiatStyle = {
      textAlign: 'center',
      borderRadius: this.round ? '100%' : '0%',
      textTransform: 'uppercase',
      color: this.fgColor,
      backgroundColor: 'red',
      font: Math.floor(this.size / this.textSizeRatio) + 'px Helvetica, Arial, sans-serif',
      lineHeight: this.size + 'px', // yes, px suffix is needed on lineHeight
      ...this.hostStyle
    }
    this.avatarStyle = initiatStyle;

  }

  _renderAsImage() {
    let imageStyle = {
      maxWidth: '100%',
      borderRadius: this.round ? '50%' : '0%',
      width: this.size,
      height: this.size,
    }
    this.avatarStyle = imageStyle;
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
