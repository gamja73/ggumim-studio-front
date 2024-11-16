package pbl.project.ggumimstudioFront.common.error;

import jakarta.validation.ConstraintViolationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import pbl.project.ggumimstudioFront.common.dto.response.CommonApiResponse;

@RestControllerAdvice
public class GlobalApiExceptionHandler
{

    // 검증 오류 처리 - MethodArgumentNotValidException
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public CommonApiResponse<CustomErrorResponse> handleValidationException(MethodArgumentNotValidException e)
    {
        BindingResult bindingResult = e.getBindingResult();
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("400", bindingResult);

        return CommonApiResponse.ERR(customErrorResponse);
    }

    // 404 Not Found 예외 처리
    @ExceptionHandler(NoHandlerFoundException.class)
    public CommonApiResponse<CustomErrorResponse> handleNotFoundException(NoHandlerFoundException e)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("404", "Resource not found");

        return CommonApiResponse.ERR(customErrorResponse);
    }

    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    public CommonApiResponse<CustomErrorResponse> handleValidationExceptions(ConstraintViolationException ex)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("400", ex.getMessage());

        return CommonApiResponse.ERR(customErrorResponse);
    }

    @ExceptionHandler(org.springframework.validation.BindException.class)
    public CommonApiResponse<CustomErrorResponse> handleMethodArgumentNotValidException(org.springframework.validation.BindException ex)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("400", ex.getMessage());

        return CommonApiResponse.ERR(customErrorResponse);
    }

    // 모든 기타 API 예외 처리
    @ExceptionHandler(Exception.class)
    public CommonApiResponse<CustomErrorResponse> handleGlobalApiException(Exception e)
    {
        CustomErrorResponse customErrorResponse = CustomErrorResponse.of("500", "Internal Server Error: " + e.getMessage());

        return CommonApiResponse.ERR(customErrorResponse);
    }
}
