package com.kanban.kanban.models.user;

import com.kanban.kanban.models.task.Task;

import java.util.ArrayList;
import java.util.List;

public record UserDTO(Long id, String firstname, String lastname, String email,  String photoUrl )  {

}
