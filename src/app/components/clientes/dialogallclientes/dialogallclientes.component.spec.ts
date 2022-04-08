import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogallclientesComponent } from './dialogallclientes.component';

describe('DialogallclientesComponent', () => {
  let component: DialogallclientesComponent;
  let fixture: ComponentFixture<DialogallclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogallclientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogallclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
