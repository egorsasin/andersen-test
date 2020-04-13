import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import InitJson from '../../../assets/data/data.json';
import { Activity } from '../interfaces/activity';

const STORAGE_KEY = 'activities_state';

interface State {
  activities: Activity[];
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private _state: BehaviorSubject<State>;

  public activities: Observable<Activity[]>;
  public total: Observable<number>;

  constructor() {
    this._state = new BehaviorSubject(this.initial);
    this.activities = this._state.pipe(
      map((state: State) => state.activities)
    );
    this.total = this._state.pipe(
      map((state: State) => this.getTotal(state.activities)),
      shareReplay(1),
    );
  }

  private getTotal(activities: Activity[]): number {
    return activities.reduce((acc, curr) => acc + curr.subtotal, 0);
  }

  private updateState(state: State) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    this._state.next(state);
  }

  private calculateMonthlyPayment(idx: number, price: number) {
    return (new Date(new Date().getFullYear(), idx + 1, 0).getDate()) * price;
  }

  private get currentState(): State {
    return this._state.getValue();
  }

  private get initial(): State {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState);
    }
    return InitJson;
  }

  // Add new activity
  addActivity(payload: Partial<Activity>): void {

    const state = this.currentState;
    let id: number = state.activities.reduce((acc, curr) =>
      acc > curr.id ? acc : curr.id, 0);

    const shedule = new Array(12).fill(null).map(() => ({ active: false }));

    const activity = <Activity>{ id: ++id , ...payload, shedule, subtotal: 0 };
    this._state.next({...state, activities: [ ...state.activities, activity ]});
  }

  // Remove activity by Id
  removeActivity (id: number): void {
    if (!id) { return; }
    const state = this.currentState;
    const activities: Activity[] = state.activities.filter((activity: Activity) => activity.id !== id);

    this.updateState({ ...state, activities });
  }

  // Tggle activity status
  toggleShedule(id: number, idx: number): void {
    if (!id) { return; }

    const state = this.currentState;
    const { activities } = state;

    const currentActivity = activities[activities.findIndex(activity => activity.id === id)];
    const status = currentActivity.shedule[idx].active;

    currentActivity.subtotal += this.calculateMonthlyPayment(idx, currentActivity.dailyPrice) * (status ? -1 : 1);
    currentActivity.shedule[idx].active = !status;

    this.updateState({ ...state, activities });

  }
}
