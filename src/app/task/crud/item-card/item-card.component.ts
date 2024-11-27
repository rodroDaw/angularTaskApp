import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { Task } from '../../models/task.model';
import { User } from '../../../user/models/user.model';

import { ButtonEditComponent } from './button-edit/button-edit.component';
import { ButtonRemoveComponent } from './button-remove/button-remove.component';


import { TaskService } from '../../service/task.service';
import { UserService } from '../../../user/service/user.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ButtonEditComponent,
    ButtonRemoveComponent
  ]
})
export class ItemCardComponent {

  @Input() task: Task | undefined;

  userList: User[] = [];

  //div para select de asignar usuario a tarea
  divSelectUserList = false;

  //btn para select de asignar usuario a tarea
  btnSelectUserList = true;

  constructor(
    private taskService: TaskService,
    private userService: UserService) { }

  showUserList(): void {
    console.log('showUserList()');
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.userList = users;
        console.log(this.userList); // Ahora `userList` ya contiene los datos
        this.divSelectUserList = true;
        this.btnSelectUserList = false;
      },
      error: (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    });
  }

  onUserSelect(event: Event): void {
    if((event.target as HTMLSelectElement).value=="empty"){
      if (this.task != undefined) {
        this.task.assigned = "";
        this.taskService.updateTask2(this.task).subscribe({
          next: (updatedTask) => {
            console.log('Tarea actualizada correctamente:', updatedTask);
            this.divSelectUserList = false;
            this.btnSelectUserList = true;
          },
          error: (error) => {
            console.error('Error al actualizar la tarea:', error);
          }
        });
      }
      this.divSelectUserList = false;
      this.btnSelectUserList = true;

    }else{
      const selectedUserId = (event.target as HTMLSelectElement).value;

      if (this.task && selectedUserId) {
        this.userService.getUserById(parseInt(selectedUserId)).subscribe({
          next: (selectedUser) => {
            if (selectedUser) {
              // Asigna el usuario a la tarea
              if (this.task != undefined) {
                this.task.assigned = selectedUser.name;
                // Llama al servicio de Task para actualizar la tarea
                this.taskService.updateTask2(this.task).subscribe({
                  next: (updatedTask) => {
                    console.log('Tarea actualizada correctamente:', updatedTask);
                    this.divSelectUserList = false;
                    this.btnSelectUserList = true;
                  },
                  error: (error) => {
                    console.error('Error al actualizar la tarea:', error);
                  }
                });
              }
            } else {
              console.error('Usuario no encontrado');
            }
          },
          error: (error) => {
            console.error('Error al obtener el usuario:', error);
          }
        });
      } else {
        console.error('No se pudo actualizar la tarea o el ID de usuario no es válido');
      }
    }

  }

}
