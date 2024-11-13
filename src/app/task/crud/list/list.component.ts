import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent

  ]
})
export class ListComponent {
  @Input() tasksList: Task[] = [];

}
