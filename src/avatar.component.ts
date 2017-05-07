import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from "./avatar.service";
import { AvatarSource } from "./utils";

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
  @Input() source: AvatarSource;
  @Input() account: string;
  @Input() src: string;
  @Input() value: string;
  @Input() name: string;
  @Input() bgColor: string;
  @Input() fgColor: string = "#FFF";
  @Input() borderColor: string;
  @Input() style: any;

  renderAsImage: boolean = true;
  avatarStyle: any = {}
  hostStyle: any = {};

  constructor(public avatarService: AvatarService) {
  }

  ngOnInit() {
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


  /**
   * Fetch avatar url based on the source type
   * 
   * @memberOf AvatarComponent
   */
  _fetchAvatarSource() {
    let avatarSrc = this.src;
    switch (this.source) {
      case "facebook":
        this.src = this.avatarService.getFacebookAvatar(this.account, this.size);
        break;
      case "twitter":
        this.src = this.avatarService.getTwitterAvatar(this.account, this.size);
        break;
      case "google":
        this.src = this.avatarService.getGoogleAvatar(this.account, this.size);
        break;
      case "skype":
        this.src = this.avatarService.getSkypeAvatar(this.account);
      default:
        // default - render as text
        if(!this.src)
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


}
