package com.inindramaclub.controller;

import com.inindramaclub.model.Post;
import com.inindramaclub.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<Post> list() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public Post get(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping(consumes = "multipart/form-data")
    public Post create(
            @RequestPart("title") String title,
            @RequestPart("content") String content,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return postService.create(title, content, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
