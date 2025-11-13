package com.kanban.kanban.controllertest;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController  // ← This is crucial
public class DotenvTest {

    @Value("${cloudinary.cloud-name:not-set}")
    private String cloudName;

    @Value("${cloudinary.api-key:}")
    private String apiKey;

    @Value("${cloudinary.api-secret:}")
    private String apiSecret;

    @GetMapping("/api/config/test")  // ← Make sure path starts with /
    public ResponseEntity<Map<String, String>> testConfig(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("cloudinaryCloudName", cloudName);
        response.put("cloudinaryApiKey", apiKey);
        response.put("cloudinaryApiSecret", apiSecret);
        response.put("status", "working");
        response.put("message", "Config endpoint is working!");
        return ResponseEntity.ok(response);
    }
}