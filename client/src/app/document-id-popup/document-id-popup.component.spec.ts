import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentIdPopupComponent } from './document-id-popup.component';

describe('DocumentIdPopupComponent', () => {
  let component: DocumentIdPopupComponent;
  let fixture: ComponentFixture<DocumentIdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentIdPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentIdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
