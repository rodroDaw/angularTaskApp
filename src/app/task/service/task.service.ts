import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks: any;

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener una tarea por id
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva tarea
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Actualizar una tarea
  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  updateTask2(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // Eliminar una tarea
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar el estado de una tarea
  updateTaskProcess(taskId: number, newProcess: Task['process']) {
    const tasks = this.tasksSubject.value.map(task =>
      task.id === taskId ? { ...task, process: newProcess } : task
    );
    this.tasksSubject.next(tasks);
  }
}
