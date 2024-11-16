package pbl.project.ggumimstudioFront.common.entity;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public abstract class BaseEntity
{
    // 생성일시
    private LocalDateTime createdAt;

    // 수정일시
    private LocalDateTime updatedAt;
}