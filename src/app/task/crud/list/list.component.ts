import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ItemCardAddComponent } from '../item-card-add/item-card-add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ItemCardComponent,
    ItemCardAddComponent

  ]
})
export class ListComponent {
  @Input() tasksList: Task[] = [];

  constructor(private taskService: TaskService) { }

  updateTaskList(updatedTasks: Task[]) {
    this.tasksList = updatedTasks; // Actualizar la lista con los datos recibidos
  }
}
