import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogproveedoresComponent } from './dialogproveedores.component';

describe('DialogproveedoresComponent', () => {
  let component: DialogproveedoresComponent;
  let fixture: ComponentFixture<DialogproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogproveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
