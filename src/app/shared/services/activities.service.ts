import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Activity } from '../interfaces/activity';

interface State {
  activities: Activity[],
  total: number,
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private _state: BehaviorSubject<State>;

  public activities: Observable<Activity[]>;
  public total: Observable<number>;

  constructor() { 
    this._state = new BehaviorSubject({ activities: [], total: 0 });
    this.activities = this._state.pipe(
      map((state: State) => state.activities)
    );
    this.total = this._state.pipe(
      map((state: State) => state.total)
    );
  }

  private get state(): State {
    return this._state.getValue();
  }

  addActivity(payload: Partial<Activity>): void {

    const state = this.state;
    let id: number = state.activities.reduce((acc, curr) =>
      acc > curr.id ? acc : curr.id, 0);

    const shedule = new Array(12).fill(null).map(() => ({ active: false, monthlyPayment: 0 }));

    const activity = <Activity>{ id: ++id , ...payload, shedule }; 
    this._state.next({...state, activities: [ ...state.activities, activity ]});
  }

  removeActivity (id: number): void {
    if (!id) return;
    const state = this.state;
    const activities: Activity[] = state.activities.filter((activity: Activity) => activity.id !== id);
    const total: number = this.getTotal(activities);

    this._state.next({ activities, total });
  }

  private getTotal(activities: Activity[]): number {
    return activities.reduce((acc, curr) => acc +curr.subtotal, 0);
  }

  toggleShedule(id: number, idx: number): void {
    if (!id) return;

    const { activities } = this.state;
    const index = activities.findIndex(activity => activity.id == id);
    const shedule = activities[index].shedule[idx];

    if (shedule.active) {
      shedule.active = false;
      shedule.monthlyPayment = 0; 
    } else {
      shedule.active = true;
      shedule.monthlyPayment = this.calculateMonthlyPayment(idx, activities[index].dailyPrice) 
    }

    activities[index].subtotal = activities[index].shedule.reduce(
      (acc, item) => acc + item.monthlyPayment, 0);
    const total: number = this.getTotal(activities); 
    this._state.next({ activities, total }); 

  }

  private calculateMonthlyPayment(idx: number, price: number) {
    return (new Date(new Date().getFullYear(), idx + 1, 0).getDate()) * price;
  }
}
