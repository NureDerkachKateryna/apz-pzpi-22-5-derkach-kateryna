import { CloudUpload } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import "cropperjs/dist/cropper.css";
import { t } from "i18next";

interface Props {
  onPhotoUploaded: (photo: File) => void;
  url?: string | undefined;
}

export default function PhotoUploadWidget({ onPhotoUploaded, url }: Props) {
  const [files, setFiles] = useState<object & { preview: string; }[]>([]);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; 
    const preview = URL.createObjectURL(file);
    const extendedFile = Object.assign(file, { preview });

    setFiles([extendedFile]);

    onPhotoUploaded(file);
  }, [onPhotoUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  return (
    <Grid container spacing={3}>
      <Grid size={4}>
        <Typography variant="overline" color="secondary">{t("photoUpload.add")}</Typography>
        <Box {...getRootProps()}
          sx={{
            border: 'dashed 3px #eee',
            borderColor: isDragActive ? 'green' : '#eee',
            borderRadius: '5px',
            paddingTop: '30px',
            textAlign: 'center',
            height: 'auto'
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 80 }} />
          <Typography variant="h5">{t("photoUpload.drop")}</Typography>
          {(files.length > 0 || url) && (
            <Box mt={2}>
              <img
                src={files[0]?.preview ?? url}
                alt="preview"
                style={{ maxWidth: '100%', borderRadius: 10 }}
              />
            </Box>
          )}
        </Box>
      </Grid>      
    </Grid>
  )
}
