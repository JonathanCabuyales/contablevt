import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpermisoComponent } from './dialogpermiso.component';

describe('DialogpermisoComponent', () => {
  let component: DialogpermisoComponent;
  let fixture: ComponentFixture<DialogpermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogpermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
