package pbl.project.ggumimstudioFront.common.error;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException
{
    private final CustomErrorCode errorCode;

    // 생성자
    public CustomException(CustomErrorCode errorCode)
    {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
