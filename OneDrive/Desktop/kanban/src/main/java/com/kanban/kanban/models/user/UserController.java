package com.kanban.kanban.models.user;


import com.kanban.kanban.exceptions.EmailAlreadyExistException;
import com.kanban.kanban.exceptions.UserNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService; // Add service layer


    public UserController(UserRepository userRepository ,UserService userService){
        this.userRepository = userRepository;
        this.userService = userService;

    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        try{
            List<User> users =(List<User>) userRepository.findAll();
            if (users.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users , HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
            public ResponseEntity<User> getUserById(@PathVariable Long id){
        System.out.println(id);
            return userService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id , @RequestBody User user){
        return  userService.update(id,user);


    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user){
        try{
            User created = userService.create(user);
            return new ResponseEntity<>(created , HttpStatus.CREATED);
        }
        catch(EmailAlreadyExistException e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch(RuntimeException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        try {
            userService.delete(id);

            Map<String, String> response = Map.of(
                    "message", "User deleted successfully",
                    "userId", id.toString()
            );
            return ResponseEntity.ok(response); // 200 OK with message

        } catch (UserNotFoundException e) {
            Map<String, String> error = Map.of("error", "User not found with id: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error); // 404 with message

        } catch (Exception e) {
            Map<String, String> error = Map.of("error", "Internal server error");
            return ResponseEntity.internalServerError().body(error); // 500 with message
        }
    }
}
