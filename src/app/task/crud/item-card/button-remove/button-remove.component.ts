import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ngModel
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { ItemCardComponent } from '../item-card.component';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-button-remove',
  templateUrl: './button-remove.component.html',
  styleUrl: './button-remove.component.css',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ButtonRemoveComponent {

  @Input() task: Task | undefined;
  currentTask: { id: number; name: string; assigned: string; difficulty: number; process: 'pending selection' | 'in progress' | 'pending validation' | 'done'; } | null | undefined;

  showModal = false;

  constructor(private taskService: TaskService) {}

  showFormModal(id: number | undefined): void {
    this.showModal = true;
    this.currentTask = this.task;
  }

  hiddeModal(){
    this.showModal = false;
  }

  removePermanent() {
    if (this.currentTask != null) {
      console.log(`Eliminando tarea con id: ${this.currentTask.id}`);

      this.taskService.deleteTask(this.currentTask.id).subscribe(() => {
        Swal.fire({
          title: 'Tarea eliminada',
          text: `La tarea "${this.currentTask?.name}" ha sido eliminada exitosamente.`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'alert alert-danger',
            confirmButton: 'btn btn-primary'
          },
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.showModal = false;
        });

      }, error => {
        console.error('Error eliminando la tarea:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la tarea. Intente de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      });
    }
  }


  /*
  removePermanent() {
    if (this.currentTask != null) {
      this.taskService.deleteTask(this.currentTask.id).subscribe(() => {

        Swal.fire({
          title: 'Tarea eliminada',
          text: `La tarea "${this.currentTask?.name}" ha sido eliminada exitosamente.`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'alert alert-danger',
            confirmButton: 'btn btn-primary'
          },
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.showModal = false;
        });

      });

    }
  }
    */

}
