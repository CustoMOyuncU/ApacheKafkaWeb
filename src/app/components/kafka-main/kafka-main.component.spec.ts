import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KafkaMainComponent } from './kafka-main.component';

describe('KafkaMainComponent', () => {
  let component: KafkaMainComponent;
  let fixture: ComponentFixture<KafkaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KafkaMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KafkaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
