package com.example.backend.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/health")
    public String health() {
        return "Backend is running";
    }

    @GetMapping("/api/health/database")
    public Map<String, Object> databaseHealth() {

        Map<String, Object> response = new HashMap<>();

        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);

            response.put("status", "UP");
            response.put("database", "PostgreSQL");
            response.put("message", "Database connected");

        } catch (Exception e) {

            response.put("status", "DOWN");
            response.put("database", "PostgreSQL");
            response.put("message", "Database unavailable");
        }

        return response;
    }
}
