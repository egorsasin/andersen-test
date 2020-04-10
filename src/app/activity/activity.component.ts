import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivitiesService } from '../shared/services/activities.service';
import { Activity } from '../shared/interfaces/activity';

/* tslint:disable:component-selector */
@Component({
  selector: '[app-activity]',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {

  @Input() activity: Activity;

  constructor(
    private activityService: ActivitiesService

  ) {}

  removeActivity() {
    this.activityService.removeActivity(this.activity.id);
  }

  toggle(idx: number) {
    this.activityService.toggleShedule(this.activity.id, idx);
  }

}

