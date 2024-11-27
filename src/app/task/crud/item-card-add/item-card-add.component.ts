import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ngModel
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

import { TaskService } from '../../service/task.service';


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

  task = {
    id: 0,
    name: '',
    assigned: '',
    difficulty: 0,
    process: 'pending selection'
  }

  showModal = false;

  constructor(private taskService: TaskService) { }

  onSubmit() {
    this.taskService.getTasks().subscribe(tasks => {
      // Calcula el id máximo y asigna el id a la nueva tarea
      const maxId = tasks.length > 0 ? Math.max(...tasks.map((t: { id: any; }) => t.id)) : 0;
      this.task.id = maxId + 1;

      console.log('onSubmit');
      console.log(this.task);

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
        });

        // Limpia los inputs del formulario
        this.task = {
          id: 0,
          name: '',
          assigned: '',
          difficulty: 0,
          process: 'pending selection'
        };
      });
    });
  }


  showFormModal() {
    this.showModal = true;
  }

  hiddeModal() {
    this.showModal = false;
  }

}
