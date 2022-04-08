import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcatastrosComponent } from './dialogcatastros.component';

describe('DialogcatastrosComponent', () => {
  let component: DialogcatastrosComponent;
  let fixture: ComponentFixture<DialogcatastrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcatastrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcatastrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
