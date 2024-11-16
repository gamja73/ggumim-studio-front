package pbl.project.ggumimstudioFront.common.error;

import lombok.Builder;
import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.stream.Collectors;

@Getter
@Builder
public class CustomErrorResponse
{
    private final String code;
    private final String message;

    // 기본 예외 생성 메서드
    public static CustomErrorResponse of(String errorCode, String errorMessage)
    {
        return CustomErrorResponse.builder()
                .code(errorCode)
                .message(errorMessage)
                .build();
    }

    // 검증 오류 생성 메서드
    public static CustomErrorResponse of(String errorCode, BindingResult bindingResult)
    {
        return CustomErrorResponse.builder()
                .code(errorCode)
                .message(createErrorMessage(bindingResult))
                .build();
    }

    // BindingResult 의 모든 필드 오류 메시지 생성
    private static String createErrorMessage(BindingResult bindingResult)
    {
        return bindingResult.getFieldErrors().stream()
                .map(CustomErrorResponse::formatFieldError)
                .collect(Collectors.joining(", "));
    }

    // 개별 필드 오류 메시지 형식화
    private static String formatFieldError(FieldError fieldError)
    {
        return String.format("[%s] %s", fieldError.getField(), fieldError.getDefaultMessage());
    }
}