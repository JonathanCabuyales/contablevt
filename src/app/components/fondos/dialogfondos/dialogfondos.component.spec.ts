import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfondosComponent } from './dialogfondos.component';

describe('DialogfondosComponent', () => {
  let component: DialogfondosComponent;
  let fixture: ComponentFixture<DialogfondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfondosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
