import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcompraretencionComponent } from './dialogcompraretencion.component';

describe('DialogcompraretencionComponent', () => {
  let component: DialogcompraretencionComponent;
  let fixture: ComponentFixture<DialogcompraretencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcompraretencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcompraretencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
