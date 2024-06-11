import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichercongesComponent } from './afficherconges.component';

describe('AffichercongesComponent', () => {
  let component: AffichercongesComponent;
  let fixture: ComponentFixture<AffichercongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffichercongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffichercongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
