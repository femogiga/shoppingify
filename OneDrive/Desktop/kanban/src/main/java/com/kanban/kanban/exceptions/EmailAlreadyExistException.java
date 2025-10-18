package com.kanban.kanban.exceptions;

public class EmailAlreadyExistException extends RuntimeException{

    public EmailAlreadyExistException(String email){
        super("Email already Exists " + email);
    }
}
