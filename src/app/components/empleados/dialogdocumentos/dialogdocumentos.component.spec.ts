import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdocumentosComponent } from './dialogdocumentos.component';

describe('DialogdocumentosComponent', () => {
  let component: DialogdocumentosComponent;
  let fixture: ComponentFixture<DialogdocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogdocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
