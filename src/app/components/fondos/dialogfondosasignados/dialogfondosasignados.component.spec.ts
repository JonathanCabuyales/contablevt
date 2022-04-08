import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfondosasignadosComponent } from './dialogfondosasignados.component';

describe('DialogfondosasignadosComponent', () => {
  let component: DialogfondosasignadosComponent;
  let fixture: ComponentFixture<DialogfondosasignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfondosasignadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfondosasignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
