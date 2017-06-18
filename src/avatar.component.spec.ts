import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AvatarComponent } from './avatar.component';
import { SourceFactory } from "./sources/source.factory";
import { Http,HttpModule } from "@angular/http";

describe('Avatar Component', () => {

  let component:    AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let sourceFactory:SourceFactory;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [AvatarComponent], 
      providers:[
      {
            provide: Http,
            useValue: null
}]
    });

    fixture = TestBed.createComponent(AvatarComponent);
    // SourceService actually injected into the component
    //sourceFactory = fixture.debugElement.injector.get(sourceFactory);


    component = fixture.componentInstance; // AvatarComponent test instance

    de = fixture.debugElement.query(By.css('div'));
    el = de.nativeElement;
  });
 
  it("sould be created",()=>{
    expect(component instanceof AvatarComponent).toBe(true);
  });

});