package pbl.project.ggumimstudioFront.file.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pbl.project.ggumimstudioFront.common.dto.response.CommonApiResponse;
import pbl.project.ggumimstudioFront.file.dto.response.FileResponseDto;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/file")
public class FileController
{

    @PostMapping("")
    public CommonApiResponse<FileResponseDto> uploadFile(@RequestParam("file") MultipartFile file)
    {
//        FileResponseDto responseDto = fileService.uploadFile(file);
//        return CommonApiResponse.OK(responseDto);
        return CommonApiResponse.OK();
    }

    @GetMapping("/{fileUID}")
    public CommonApiResponse<FileResponseDto> findFile(@PathVariable Long fileUID)
    {
//        FileResponseDto responseDto = fileService.findFile(fileUID);
//        return CommonApiResponse.OK(responseDto);
        return CommonApiResponse.OK();
    }
}
