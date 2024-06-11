import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherchefsComponent } from './afficherchefs.component';

describe('AfficherchefsComponent', () => {
  let component: AfficherchefsComponent;
  let fixture: ComponentFixture<AfficherchefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfficherchefsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficherchefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
