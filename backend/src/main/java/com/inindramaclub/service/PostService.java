package com.inindramaclub.service;

import com.inindramaclub.model.Post;
import com.inindramaclub.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public List<Post> findAll() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post findById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found: " + id));
    }

    public Post create(String title, String content, MultipartFile image) throws IOException {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);

        if (image != null && !image.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path dir = Paths.get(uploadDir);
            Files.createDirectories(dir);
            Files.copy(image.getInputStream(), dir.resolve(fileName));
            post.setImageFileName(fileName);
        }

        return postRepository.save(post);
    }

    public void delete(Long id) {
        Post post = findById(id);
        if (post.getImageFileName() != null) {
            try {
                Files.deleteIfExists(Paths.get(uploadDir, post.getImageFileName()));
            } catch (IOException ignored) {}
        }
        postRepository.delete(post);
    }
}
