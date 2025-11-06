package com.kanban.kanban.models.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.Serial;
import java.util.Optional;


@Repository
public interface UserRepository  extends CrudRepository<User, Long> {
     boolean  existsByEmail(String email);
     Optional<User> findByEmail(String email);
    Optional<User> findUserByEmail(String email);

    void deleteByEmail(String email);
}
