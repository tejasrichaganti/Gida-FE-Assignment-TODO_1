import { Component, OnInit } from '@angular/core';
import { ChecklistService } from './checklist.service';
import { ToDos } from '../../models/ToDos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent implements OnInit {
  todolist: ToDos[] = [];
  completedtasks: ToDos[] = [];
  showSignUp: boolean = false;
  // showNewTask: boolean = false;
  newTask: ToDos = {} as ToDos;

  ngOnInit(): void {
   this.getToDoList(); 
  }

  constructor(private checklistService : ChecklistService){
   
  }

  getToDoList(){
    this.checklistService.getToDOs().subscribe((data)=>{
      let taskitems = localStorage.getItem('todos') || [];   
      if(taskitems.length === 0){
          localStorage.setItem('todos',JSON.stringify(data)); 
      }  
      taskitems =  localStorage.getItem('todos') || [];
      this.todolist = JSON.parse(taskitems.toString()).slice(0,20);
      console.log(this.todolist,'items');
      this.completedtasks = this.todolist.filter((x)=> x.completed === true); 
    });
  }

  signUp(){
    this.showSignUp = !this.showSignUp;
  }
  addTask() {
    this.newTask = {

      title: this.newTask.title,
      completed: false,
      userId: 0 
    };
  
    this.checklistService.addNewTasks(this.newTask).subscribe(
      response => {
        this.getToDoList();        
      },
      error => {
        console.error('Error adding task:', error);
      }
    );
  }
  onCompleteTask(task:ToDos){
    let taskItemsList: ToDos[] = JSON.parse(localStorage.getItem('todos') || '[]');
    if (task.completed) {
      taskItemsList = taskItemsList.filter((item) => item.id !== task.id);
    }
    localStorage.setItem('todos', JSON.stringify(taskItemsList));
    this.getToDoList(); 
  }

  deleteTask(task:ToDos){
    let taskItemsList: ToDos[] = JSON.parse(localStorage.getItem('todos') || '[]');
    taskItemsList = taskItemsList.filter((item) => item.id !== task.id);  
    localStorage.setItem('todos', JSON.stringify(taskItemsList));
    this.getToDoList(); 
  }

}
