import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivitiesService } from '../shared/services/activities.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public activityForm = this.fb.group({
    name: [ '', Validators.required ],
    dailyPrice: ['', [ Validators.required, Validators.pattern(/^[0-9]+?$/), Validators.min(1) ] ],
  });

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
  }

  addActivity() {
    if (this.activityForm.valid) {
      const values = this.activityForm.value;
      this.activitiesService.addActivity({ ...values, dailyPrice: +values.dailyPrice });
      this.activityForm.reset();
    }
  }

}
