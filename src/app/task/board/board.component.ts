import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DragDropModule,
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TaskService } from '../service/task.service';
import { Task } from '../models/task.model';
import { parse } from 'path';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDropListGroup, CdkDropList, CdkDrag
  ]
})
export class BoardComponent {

  readonly taskStatuses: Task['process'][] = [
    'pending selection',
    'in progress',
    'pending validation',
    'done'
  ];

  tasksByStatus: {
    'pending selection': Task[],
    'in progress': Task[],
    'pending validation': Task[],
    'done': Task[]
  } = {
    'pending selection': [],
    'in progress': [],
    'pending validation': [],
    'done': []
  };


  tasksList: Task[] = [];

  hoveredStatus: Task['process'] | null = null;

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasksList = data;

      this.tasksByStatus = {
        'pending selection': this.tasksList.filter(t => t.process === 'pending selection'),
        'in progress': this.tasksList.filter(t => t.process === 'in progress'),
        'pending validation': this.tasksList.filter(t => t.process === 'pending validation'),
        'done': this.tasksList.filter(t => t.process === 'done')
      };
    });
  }

  constructor(private taskService: TaskService) { }

  drop(event: CdkDragDrop<any>) {
    console.log('drop!!!!!!!!!');

    /*
    console.log('event');
    console.log(event);

    console.log('idTask');
    console.log(event.item.element.nativeElement.firstChild?.textContent);
    */
    //idTask console.log(event.item.element.nativeElement.firstChild?.textContent);
    const taskIdString = event.item.element.nativeElement.firstChild?.textContent;
    const idTaskMoved = taskIdString ? Number(taskIdString) : NaN;

    //process de columna nueva
    console.log('process');
    //console.log($('.data-id-task'));
    let findDomElementIdTask = document.querySelectorAll('.data-id-task');
   // Filtrar el elemento cuyo texto sea igual a 'taskIdString'
    let elementIdTask = Array.from(findDomElementIdTask).find(el => el.textContent && el.textContent.trim() === taskIdString);
    if(elementIdTask){
      console.log(elementIdTask.parentElement)
      let padreColumn = elementIdTask.closest('.column');
      console.log(padreColumn);
    }


    if (event.previousContainer === event.container) {
      //Movemos la TASK sobre la misma columna
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //Movemos la TASK sobre otra columna (CAMBIAMOS EL process)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.taskService.getTaskById(idTaskMoved).subscribe({
        next: (selectedTask) => {
          if (selectedTask) {
            this.taskService.updateTask2(selectedTask).subscribe({
              next: (updatedTask) => {
                updatedTask.process = "done";
                console.log('Tarea actualizada correctamente:', updatedTask);
              },
              error: (error) => {
                console.error('Error al actualizar la tarea:', error);
              }
            });

          } else {
            console.error('Tarea no encontrada');
          }
        },
        error: (error) => {
          console.error('Error al obtener la tarea:', error);
        }
      });

      /*
      const taskMoved = this.taskService.getTaskById(Number(idTaskMoved));
      console.log('taskMoved!');
      console.log(taskMoved);
      */
    }
  }

  /*
  drop(event: CdkDragDrop<Task[]>, newProcess: Task['process']) {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      this.taskService.updateTaskProcess(task.id, newProcess);
    }
  }

  drop(event: CdkDragDrop<Task[]>, newProcess: Task['process']) {
    console.log('Dropped!', event);

    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      this.taskService.updateTaskProcess(task.id, newProcess);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.hoveredStatus = null; // Resetea el estado visual después de soltar el elemento
  }

  onDragEnter(status: Task['process']) {
    console.log('Entrando en column:', status); // Verifica en consola
    this.hoveredStatus = status;
  }

  onDragExit() {
    console.log('Saliendo de column'); // Verifica en consola
    this.hoveredStatus = null;
  }
    */

}
