export interface Task {

  id: string;

  name: string;

  //Nombre de Usuario asignado
  assigned: string;

  //Dificultad de tarea 0 a 5
  difficulty: number;

  //Proceso de tarea, por defecto 'pendiente de seleccionar'
  process: 'pending selection' | 'in progress' | 'pending validation' | 'done';
}
