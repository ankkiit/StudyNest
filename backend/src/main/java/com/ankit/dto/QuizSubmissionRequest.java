package com.ankit.dto;

import lombok.*;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmissionRequest {
    private Map<Long, String> answers; 
    // Key = questionId, Value = chosen option (A/B/C/D)
}
