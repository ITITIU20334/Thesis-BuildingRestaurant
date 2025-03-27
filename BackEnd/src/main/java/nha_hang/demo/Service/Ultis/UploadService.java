package nha_hang.demo.Service.Ultis;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class UploadService {
    public Cloudinary cloudinaryConfigs(){
        Cloudinary cloudinary = null;
        Map config = new HashMap();
        config.put("cloud_name", "dis3h8jsk");
        config.put("api_key", "965883511798962");
        config.put("api_secret", "DxI3Qy8bA2s79ypFdAutN0vWY4U");
        cloudinary = new Cloudinary(config);
        return cloudinary;
    }
    public String uploadFile(MultipartFile file) {
        try {
            File uploadedFile = convertMultiPartToFile(file);
            Map uploadResult = cloudinaryConfigs().uploader().upload(uploadedFile, ObjectUtils.emptyMap());
            uploadedFile.delete();
            return  uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
