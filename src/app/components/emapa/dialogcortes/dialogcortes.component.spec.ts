import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcortesComponent } from './dialogcortes.component';

describe('DialogcortesComponent', () => {
  let component: DialogcortesComponent;
  let fixture: ComponentFixture<DialogcortesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcortesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
