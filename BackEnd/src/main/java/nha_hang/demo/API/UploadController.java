package nha_hang.demo.API;

import lombok.AllArgsConstructor;
import nha_hang.demo.Service.Ultis.UploadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin
@AllArgsConstructor
public class UploadController {
    private UploadService uploadService;

    @PostMapping("/public/upload-file")
    public String uploadFile(@RequestParam("file")MultipartFile file){
        try {
            return uploadService.uploadFile(file);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
