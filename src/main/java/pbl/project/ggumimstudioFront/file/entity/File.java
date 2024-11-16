package pbl.project.ggumimstudioFront.file.entity;

import lombok.*;
import pbl.project.ggumimstudioFront.common.entity.BaseEntity;

@Getter
public class File extends BaseEntity
{
    // UID
    private Long fileUID;

    // 회원 UID
    private Long userUID;

    // 관리자 UID
    private Long adminUID;

    // 원본 파일명
    private String fileName;

    // 원본 파일 URL
    private String originURL;

    // webp 변환 파일 URL
    private String webpURL;
}
