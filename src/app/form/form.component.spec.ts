import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../shared/services/activities.service';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: ActivitiesService, useValue: { addActivity: () => {} }}
      ],
      declarations: [ FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
      expect(component.activityForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
      const name = component.activityForm.controls['name'];
      expect(name.valid).toBeFalsy();

      name.setValue('');
      expect(name.hasError('required')).toBeTruthy();
  });

  it('daily price field validity', () => {
    const dailyPrice = component.activityForm.controls['dailyPrice'];
    expect(dailyPrice.valid).toBeFalsy();

    dailyPrice.setValue('');
    expect(dailyPrice.hasError('required')).toBeTruthy();

    dailyPrice.setValue('4');
    expect(dailyPrice.hasError('min')).toBeFalsy();
  });

  it('should call addActivity when submitted', () => {

    const activityService = TestBed.get(ActivitiesService);
    const spy = spyOn(activityService, 'addActivity');

    const dailyPrice = component.activityForm.controls['dailyPrice'];
    dailyPrice.setValue('10');

    const name = component.activityForm.controls['name'];
    name.setValue('Test');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(activityService.addActivity).toHaveBeenCalled();
  });

});
