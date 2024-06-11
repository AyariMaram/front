import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheremployesComponent } from './afficheremployes.component';

describe('AfficheremployesComponent', () => {
  let component: AfficheremployesComponent;
  let fixture: ComponentFixture<AfficheremployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfficheremployesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficheremployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
