package com.example.ebanking.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {
    public void uploadFile(MultipartFile theFile) throws IOException;
}
