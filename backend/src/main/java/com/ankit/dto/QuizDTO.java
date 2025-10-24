package com.ankit.dto;

//DTO (Data Transfer Object)
public class QuizDTO {
 private Long id;
 private String title;
 

 public QuizDTO(Long id, String title) {
     this.id = id;
     this.title = title;
 }

 public Long getId() {
     return id;
 }

 public String getTitle() {
     return title;
 }
}
