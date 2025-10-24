package com.ankit.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ankit.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

