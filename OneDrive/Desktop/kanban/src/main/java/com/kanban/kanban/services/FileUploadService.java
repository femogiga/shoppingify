package com.kanban.kanban.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileUploadService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private CompressionService compressionService;

    public String uploadFile(MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File is empty");
            }

            // Check file type
            String contentType = file.getContentType();
            if (contentType == null ||
                    (!contentType.startsWith("image/") &&
                            !contentType.equals("application/pdf"))) {
                throw new IllegalArgumentException("Only images and PDF files are allowed");
            }

            byte[] fileData;

            // Compress images, but not PDFs
            if (contentType.startsWith("image/")) {
                if (file.getSize() > 5 * 1024 * 1024) {
                    // Large image - compress it
                    fileData = compressionService.compressForAvatars(file);
                    System.out.println("Compressed large image file");
                } else {
                    // Small image - still compress for optimization
                    fileData = compressionService.compressForAvatars(file);
                    System.out.println("Compressed regular image file");
                }
            } else {
                // PDF file - don't compress, use original
                fileData = file.getBytes();
                System.out.println("Using original PDF file (no compression)");
            }

            // Upload to Cloudinary
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    fileData,
                    ObjectUtils.asMap(
                            "folder", "uploads",
                            "resource_type", "auto", // Automatically detect image, video, etc.
                            "quality", "auto",
                            "fetch_format", "auto"
                    )
            );

            // Return the secure URL
            System.out.println("Upload successful: " + uploadResult.get("secure_url").toString());
            return uploadResult.get("secure_url").toString();

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String imageUrl) {
        try {
            // Extract public ID from URL
            String publicId = extractPublicIdFromUrl(imageUrl);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete file: " + e.getMessage(), e);
        }
    }

    private String extractPublicIdFromUrl(String url) {
        // Extract public ID from Cloudinary URL
        // Example: https://res.cloudinary.com/demo/image/upload/v1234567/kanban-app/users/public_id.jpg
        String[] parts = url.split("/");
        String filenameWithExtension = parts[parts.length - 1];
        String publicIdWithPath = "kanban-app/users/" +
                filenameWithExtension.substring(0, filenameWithExtension.lastIndexOf('.'));
        return publicIdWithPath;
    }
}