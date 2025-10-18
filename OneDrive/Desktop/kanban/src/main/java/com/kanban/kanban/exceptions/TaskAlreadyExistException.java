package com.kanban.kanban.exceptions;

public class TaskAlreadyExistException extends RuntimeException {
   public  TaskAlreadyExistException(){
       super("Task Already exist Choose another name");
   }
}
