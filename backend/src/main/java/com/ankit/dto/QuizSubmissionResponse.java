package com.ankit.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSubmissionResponse {
    private Long quizId;
    private String quizTitle;
    private String courseTitle;
    private int score;
    private int totalQuestions;
    private LocalDateTime submittedAt;
}
