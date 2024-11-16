package pbl.project.ggumimstudioFront.file.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileUploadDto
{
    private Long userUID;
    private Long adminUID;
    private String fileName;
    private String originUrl;
    private String webpUrl;
}
