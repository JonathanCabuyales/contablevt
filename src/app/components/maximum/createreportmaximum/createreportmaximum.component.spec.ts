import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatereportmaximumComponent } from './createreportmaximum.component';

describe('CreatereportmaximumComponent', () => {
  let component: CreatereportmaximumComponent;
  let fixture: ComponentFixture<CreatereportmaximumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatereportmaximumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatereportmaximumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
