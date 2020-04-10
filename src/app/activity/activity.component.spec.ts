import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import { ActivitiesService } from '../shared/services/activities.service';
import { By } from '@angular/platform-browser';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityComponent ],
      providers: [
        {
          provide: ActivitiesService,
          useValue: {
            toggleShedule: (id: number) => {},
            removeActivity: (id: number, idx: number) => {}
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    const shedule = new Array(12).fill(null).map(() => ({ active: false, monthlyPayment: 0 }));
    component.activity = { id: 1, name: 'Test Name', dailyPrice: 10, shedule, subtotal: 0 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should call removeActivity when button pushed', () => {

    const activityService = TestBed.get(ActivitiesService);
    const spy = spyOn(activityService, 'removeActivity');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(activityService.removeActivity).toHaveBeenCalled();
  });

  it('should call toggleShedule when checked', () => {

    const activityService = TestBed.get(ActivitiesService);
    const spy = spyOn(activityService, 'toggleShedule');

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.triggerEventHandler('change', {});
    fixture.detectChanges();

    expect(activityService.toggleShedule).toHaveBeenCalled();
  });

});
