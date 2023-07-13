import { Component, OnInit} from '@angular/core';
import { CrudService } from '../crud.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  taskObj :Task=new Task();
  taskArr: Task[]=[];
  addTaskValue : string ='';
  editTaskValue :string='';
  constructor(private crudService : CrudService){

  }
  ngOnInit(): void {
    this.editTaskValue='';
    this.addTaskValue='';
    this.taskObj=new Task();
    this.taskArr=[];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe((res)=>{
      this.taskArr=res;
    })
  }
  addTask(){
    this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe((res)=>{
      this.ngOnInit();
      this.addTaskValue='';
    })
  }
  editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe((res)=>{
      this.ngOnInit();
    })
  }
  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe((res)=>{
      alert("your task is deleted");
      this.ngOnInit();
    })
  }
  call(etask:Task){
    this.taskObj=etask;
    this.editTaskValue=etask.task_name;
  }
}
