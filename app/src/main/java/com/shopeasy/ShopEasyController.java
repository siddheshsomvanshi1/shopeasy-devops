package com.shopeasy;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class ShopEasyController {

    @GetMapping("/")
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("app", "ShopEasy");
        response.put("version", "1.0.0");
        response.put("status", "running");
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("app", "ShopEasy");
        return response;
    }

    @GetMapping("/products")
    public List<Map<String, Object>> products() {
        List<Map<String, Object>> products = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("id", 1);
        p1.put("name", "Laptop");
        p1.put("price", 999.99);
        p1.put("category", "Electronics");
        products.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("id", 2);
        p2.put("name", "Smartphone");
        p2.put("price", 599.99);
        p2.put("category", "Electronics");
        products.add(p2);

        Map<String, Object> p3 = new HashMap<>();
        p3.put("id", 3);
        p3.put("name", "Running Shoes");
        p3.put("price", 89.99);
        p3.put("category", "Sports");
        products.add(p3);

        return products;
    }
}
