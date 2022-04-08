import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmapaComponent } from './emapa.component';

describe('EmapaComponent', () => {
  let component: EmapaComponent;
  let fixture: ComponentFixture<EmapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
