import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ngModel
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { TaskService } from '../../service/task.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-item-card-add',
  templateUrl: './item-card-add.component.html',
  styleUrl: './item-card-add.component.css',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ItemCardAddComponent {

  @Output() taskAdded = new EventEmitter<any>();

  tasksList: Task[] = [];

  task = {
    name: "",
    assigned: "",
    difficulty: 0,
    process: "pending selection"
  }

  showModal = false;

  constructor(private taskService: TaskService) { }

  refreshTaskList() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.taskAdded.emit(data);
    });
  }

  onSubmit() {

    // Llama a createTask y se suscribe para insertar la tarea
    this.taskService.createTask(this.task).subscribe(() => {
      Swal.fire({
        title: 'Tarea creada',
        text: 'La tarea "' + this.task.name + '" ha sido creada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alert alert-success',
          confirmButton: 'btn btn-primary'
        },
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        this.showModal = false;
        this.refreshTaskList();

      });

      // Limpia los inputs del formulario
    });
  }


  showFormModal() {
    this.showModal = true;
  }

  hiddeModal() {
    this.showModal = false;
  }



}
