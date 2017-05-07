import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from "./avatar.service";
import { AvatarSource } from "./utils";
import { Source } from "./source.model";

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
    <img *ngIf="renderAsImage"
      [src]="src"
      [width]="size"
      [height]="size"
      [ngStyle]="avatarStyle"
      (error)="updateUrl($event)"
     />

   <div *ngIf="!renderAsImage"
     [ngStyle]="avatarStyle">{{value}}</div>
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

  src: string;

  renderAsImage: boolean = true;
  avatarStyle: any = {}
  hostStyle: any = {};

  constructor(public avatarService: AvatarService) {
  }

  ngOnInit() {

    this._sources.sort((leftSide, rightSide) => {
      return this.avatarService.getSourcePriority(leftSide.sourceKey) - this.avatarService.getSourcePriority(rightSide.sourceKey);
    });

    this._sources.forEach((item, index) => {
      console.log("Priority : " + index + " - value : " + item.sourceKey);
    });

    this.hostStyle = {
      display: 'inline-block',
      width: this.size,
      height: this.size,
      ...this.style
    }
    this._fetchAvatarSource();
    if (this.renderAsImage) {
      this._renderAsImage();
    } else {
      this._renderAsText();
    }

  }

  get facebookId(): string {
    return this._facebookId;
  }

  @Input('facebookId')
  set facebookId(value: string) {
    this._facebookId = value;
    this._addAvatarSource('facebook', this._facebookId);
  }

  get twitterId(): string {
    return this._twitterId;
  }

  @Input('twitterId')
  set twitterId(value: string) {
    this._twitterId = value;
    this._addAvatarSource('twitter', this._twitterId);
  }

  get googleId(): string {
    return this._googleId;
  }

  @Input('googleId')
  set googleId(value: string) {
    this._googleId = value;
    this._addAvatarSource('google', this._googleId);
  }

  get skypeId(): string {
    return this._skypeId;
  }

  @Input('skypeId')
  set skypeId(value: string) {
    this._skypeId = value;
    this._addAvatarSource('skype', this._skypeId);

  }

  get gravatarId(): string {
    return this._gravatarId;
  }

  @Input('gravatarId')
  set gravatarId(value: string) {
    this._gravatarId = value;
    this._addAvatarSource('gravatar', this._gravatarId);
  }

  get customImage(): string {
    return this._customImage;
  }

  @Input('custom')
  set customImage(value: string) {
    this._customImage = value;
    this._addAvatarSource('custom', this._customImage);
  }

  get name(): string {
    return this._customImage;
  }

  @Input('name')
  set name(value: string) {
    this._initials = this._getInitials(value);
    this._addAvatarSource('initials', this._initials);
  }

  _addAvatarSource(sourceKey: string, sourceValue: string) {
    this._sources.push({ sourceKey, sourceValue });
  }


  /**
   * Fetch avatar url based on the source type
   * 
   * @memberOf AvatarComponent
   */
  _fetchAvatarSource() {
    let avatarSrc = this.src;
    let source = this._sources[this._currentSource];
    switch (source.sourceKey) {
      case "facebook":
        this.src = this.avatarService.getFacebookAvatar(source.sourceValue, this.size);
        break;
      case "twitter":
        this.src = this.avatarService.getTwitterAvatar(source.sourceValue, this.size);
        break;
      case "google":
        this.src = this.avatarService.getGoogleAvatar(source.sourceValue, this.size);
        break;
      case "skype":
        this.src = this.avatarService.getSkypeAvatar(source.sourceValue);
      default:
        // default - render as text
        if (!this.src)
          this.renderAsImage = false;
        break;
    }

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
      backgroundColor: '',
      ...this.hostStyle
    }
    this.avatarStyle = initiatStyle

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
