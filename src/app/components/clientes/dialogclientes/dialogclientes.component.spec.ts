import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogclientesComponent } from './dialogclientes.component';

describe('DialogclientesComponent', () => {
  let component: DialogclientesComponent;
  let fixture: ComponentFixture<DialogclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
