package com.example.ebanking.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;

@Service
@Transactional
public class FileUploadServiceImpl implements FileUploadService {
    @Override
    public void uploadFile(MultipartFile theFile) throws IOException {
        try {

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
