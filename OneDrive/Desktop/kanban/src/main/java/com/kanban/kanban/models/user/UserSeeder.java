package com.kanban.kanban.models.user;



import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data (optional)
        userRepository.deleteAll();

        // Create sample users
        User admin = new User("John", "Doe", "admin@kanban.com", passwordEncoder.encode("admin123"), "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", List.of("ADMIN","USER"));
        User user1 = new User("Alice", "Smith", "alice@kanban.com", passwordEncoder.encode("password123"), "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" , List.of("USER"));
        User user2 = new User("Bob", "Johnson", "bob@kanban.com", passwordEncoder.encode("password123"), "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg", List.of("USER"));

        userRepository.save(admin);
        userRepository.save(user1);
        userRepository.save(user2);

        System.out.println("✅ Sample data seeded successfully!");
        System.out.println("Total users: " + userRepository.count());
    }
}