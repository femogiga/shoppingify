package com.kanban.kanban.services;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;

@Service
public class CompressionService {

    /**
     * BEST compression for user avatars
     * - Perfect balance of quality vs size
     * - Fast processing
     * - Minimal visible quality loss
     */
    public byte[] compressForAvatars(MultipartFile file) throws IOException {
        if (!Objects.requireNonNull(file.getContentType()).startsWith("image/")) {
            return file.getBytes();
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(new ByteArrayInputStream(file.getBytes()))
                .size(400, 400)          // Perfect for avatars
                .outputQuality(0.85)     // 85% - Sweet spot for quality/size
                .outputFormat("jpg")     // Best compression format
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    /**
     * For larger images (project covers, task attachments)
     */
    public byte[] compressForGeneralUse(MultipartFile file) throws IOException {
        if (!Objects.requireNonNull(file.getContentType()).startsWith("image/")) {
            return file.getBytes();
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(new ByteArrayInputStream(file.getBytes()))
                .size(1200, 1200)        // Good for larger displays
                .outputQuality(0.80)     // 80% - Slightly more compression
                .outputFormat("jpg")
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }
}