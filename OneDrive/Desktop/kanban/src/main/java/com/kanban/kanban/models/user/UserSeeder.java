package com.kanban.kanban.models.user;



import com.kanban.kanban.models.user.User;
import com.kanban.kanban.models.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public UserSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data (optional)
        userRepository.deleteAll();

        // Create sample users
        User admin = new User("John", "Doe", "admin@kanban.com", "admin123", "https://example.com/admin.jpg");
        User user1 = new User("Alice", "Smith", "alice@kanban.com", "password123", "https://example.com/alice.jpg");
        User user2 = new User("Bob", "Johnson", "bob@kanban.com", "password123", "https://example.com/bob.jpg");

        userRepository.save(admin);
        userRepository.save(user1);
        userRepository.save(user2);

        System.out.println("✅ Sample data seeded successfully!");
        System.out.println("Total users: " + userRepository.count());
    }
}