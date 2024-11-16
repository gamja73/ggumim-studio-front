package pbl.project.ggumimstudioFront.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomErrorCode
{
    // JWT, 인증
    TOKEN_NOT_FOUND("AUTH-001", "토큰을 찾을 수 없습니다."),
    TOKEN_INFO_NOT_FOUND("AUTH-002", "토큰의 정보를 읽을 수 없습니다."),

    // 회원
    USER_ID_OR_PASSWORD_ERR("USER-000", "아이디 또는 비밀번호가 일치하지 않습니다."),
    USER_NOT_FOUND("U-001", "회원이 존재하지 않거나 찾을 수 없습니다."),

    // 파일
    FILE_UPLOAD_FAIL("FILE-000", "파일 업로드에 실패하였습니다."),
    FILE_IS_NULL("FILE-001", "파일이 없습니다."),
    FILE_INVALID_FORMAT("FILE-002", "지원하지 않는 파일 형식입니다."),
    FILE_NOT_FOUND("FILE-003", "파일을 찾을 수 없습니다."),
    ;

    private final String errorCode;
    private final String errorMessage;
}
