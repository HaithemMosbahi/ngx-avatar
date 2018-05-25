import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AvatarComponent } from './avatar.component';
import { SourceFactory } from "./sources/source.factory";
import { HttpClient,HttpClientModule } from "@angular/common/http";

describe('Avatar Component', () => {

  let component:    AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let sourceFactory:SourceFactory;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AvatarComponent], 
      providers:[
      {
            provide: HttpClient,
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