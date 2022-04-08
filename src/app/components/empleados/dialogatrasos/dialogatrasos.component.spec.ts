import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogatrasosComponent } from './dialogatrasos.component';

describe('DialogatrasosComponent', () => {
  let component: DialogatrasosComponent;
  let fixture: ComponentFixture<DialogatrasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogatrasosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogatrasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
