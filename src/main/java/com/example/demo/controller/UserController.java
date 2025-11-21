package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
@Autowired
    private UserService service;
    

  

    @GetMapping
    public List<UserDto> all() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UserDto one(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public UserDto create(@RequestBody UserDto dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @RequestBody UserDto dto) {
        return service.update(dto);
        
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }
}