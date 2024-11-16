package pbl.project.ggumimstudioFront.user.entity;

import lombok.Getter;
import pbl.project.ggumimstudioFront.common.entity.BaseEntity;

@Getter
public class User extends BaseEntity
{
    // UID
    private Long userUID;

    // 회원 ID
    private String userId;

    // 회원 비밀번호
    private String password;

    // 회원명
    private String userName;

    // 이메일 주소
    private String userEmail;

    // 전화번호
    private String callPhone;

    // 주소
    private String address;

    // 상세 주소
    private String addressDetail;

    // 회원 별명
    private String nickname;
}
