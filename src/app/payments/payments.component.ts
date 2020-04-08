import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Activity } from '../shared/interfaces/activity';
import { ActivitiesService } from '../shared/services/activities.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  public headers = ['Наименование платежа', 'Стоимость', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
    'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек', 'Удалить' ];

  public activities: Observable<Activity[]>;  
  public total: Observable<number>;

  constructor(
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activities = this.activitiesService.activities
    this.total = this.activitiesService.total;
  }
  
  identify(index, item: Activity){
    return item.id; 
  }

}
