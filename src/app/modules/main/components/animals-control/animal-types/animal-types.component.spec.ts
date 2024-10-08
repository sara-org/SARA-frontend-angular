import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalTypesComponent } from './animal-types.component';

describe('AnimalTypesComponent', () => {
  let component: AnimalTypesComponent;
  let fixture: ComponentFixture<AnimalTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
