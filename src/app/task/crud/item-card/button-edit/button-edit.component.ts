import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ngModel
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrl: './button-edit.component.css',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ButtonEditComponent {

  @Input() task: Task | undefined;
  currentTask: { id: number; name: string; assigned: string; difficulty: number; process: 'pending selection' | 'in progress' | 'pending validation' | 'done'; } | null | undefined;

  alertUpdate = false;
  showModal = false;

  constructor(private taskService: TaskService) {}

  showFormModalUpdate(id: number | undefined): void {
    // Copia buena del producto encontrado en lugar de una referencia
    const taskOriginal = this.task;
    this.currentTask = taskOriginal ? { ...taskOriginal } : null;
    this.showModal = true;
  }

  inputValid(){
    if (this.task != undefined) {
      if (this.task.name === "" && this.currentTask != undefined) {
        this.task.name = this.currentTask.name;
      }
    }
  }

  updateValid(){

    if (this.currentTask != null) {
      this.taskService.updateTask(this.currentTask.id).subscribe(() => {

      });
    }
    

    if (this.task != undefined) {
      Swal.fire({
        title: 'Tarea actualizada',
        text: `La tarea "${this.task.name}" ha sido actualizada exitosamente.`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alert alert-primary',
          confirmButton: 'btn btn-primary'
        },
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        this.showModal = false;
      });

      this.showModal = false;
    }
  }

  hiddeModalUpdate() {
    if (this.task != undefined && this.currentTask != undefined) {
      this.task.name = this.currentTask.name;
      this.task.assigned = this.task.assigned;
      this.task.difficulty = this.task.difficulty;
      this.task.process = this.task.process;
    }
    this.showModal = false;
  }


}
