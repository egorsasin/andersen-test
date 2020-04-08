import { TestBed } from '@angular/core/testing';

import { ActivitiesService } from './activities.service';

describe('ActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitiesService = TestBed.get(ActivitiesService);
    expect(service).toBeTruthy();
  });

  it('should add activity', () => {
    const expectedActivity = { name: 'Test activity', dailyPrice: 10 };
    const service: ActivitiesService = TestBed.get(ActivitiesService);
    service.activities.subscribe(
      activities => { 
        expect(activities.length).toEqual(1),
        expect(activities[0].id).toEqual(1)
      },
      fail
    );
    service.addActivity(expectedActivity);
  });

  it('should set shedule', () => {
    const expectedActivity = { name: 'Test activity', dailyPrice: 10 };
    const service: ActivitiesService = TestBed.get(ActivitiesService);
    service.addActivity(expectedActivity);

    service.toggleShedule(1, 0);

    service.total.subscribe(
      total => expect(total).toEqual(310),
      fail
    );
    
  });

  it('should remove activity', () => {
    const expectedActivity = { name: 'Test activity', dailyPrice: 10 };
    const service: ActivitiesService = TestBed.get(ActivitiesService);
    service.addActivity(expectedActivity);

    service.removeActivity(1);
    service.total.subscribe(
      total => expect(total).toEqual(0),
      fail
    );
    service.activities.subscribe(
      activities => expect(activities.length).toEqual(0),
      fail
    );
    
  });

});
