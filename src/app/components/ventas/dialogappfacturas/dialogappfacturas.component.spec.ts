import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogappfacturasComponent } from './dialogappfacturas.component';

describe('DialogappfacturasComponent', () => {
  let component: DialogappfacturasComponent;
  let fixture: ComponentFixture<DialogappfacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogappfacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogappfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
