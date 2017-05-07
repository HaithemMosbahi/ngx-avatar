import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ng-avatar',
  styles: [`
  :host{
    display:inline-block
    border-radius: "50%",
  }
  `],
  template: `
    <div [ngStyle]="hostStyle">
    <img *ngIf="!value"
      [src]="imageUrl"
      [width]="size"
      [height]="size"
      [ngStyle]="avatarStyle"
      (error)="updateUrl($event)"
     />

   <div *ngIf="value" [style.background-color]="bgColor"
     [style.height.px]="size"  [style.width.px]="size"
     [style.font-size.px]="size / textSizeRatio"
     [style.line-height.px]="size">{{value}}</div>
   </div>`
})
export class AvatarComponent implements OnInit {

  @Input() round: boolean = true;
  @Input() size: number = 50;
  @Input() textSizeRatio: number = 3;
  @Input() account: string;
  @Input() src: string;
  @Input() value: string;
  @Input() name: string;
  @Input() bgColor: string;
  @Input() borderColor: string;
  @Input() style: any;

  renderAsImage: boolean = false;
  imageUrl: string;
  avatarStyle: any = {}
  hostStyle:any={};

  constructor() {
  }

  ngOnInit() {
    this.hostStyle = {
      display: 'inline-block',
      width: this.size,
      height: this.size,
      borderRadius: 500,
      ...this.style
    }
  }

  updateUrl() {
    console.log("Fallback option");
  }


  _renderAsText() {
    let initiatStyle = {
    }
    this.avatarStyle = initiatStyle

  }

  _renderAsImage() {
    let imageStyle = {

    }
    this.avatarStyle = imageStyle;
  }


}
