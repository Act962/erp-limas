"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

import {
  RenderLogoEmptyState,
  RenderLogoUploadedState,
  RenderLogoUploadingState,
} from "./render-state";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { RenderUploadedState } from "../file-uploader/render-state";
import { toast } from "sonner";

const MAX_SIZE = 1024 * 1024 * 2;

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface LogoUploaderProps {
  value?: string;
  onChange?: (value: string) => void;
  // fileTypeAccepted?: "image" | "video";
}

export function LogoUploader({ value, onChange }: LogoUploaderProps) {
  const fileUrl = useConstructUrl(value || "");
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: "image",
    key: value,
    objectUrl: value ? fileUrl : undefined,
  });

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
      }));

      try {
        // 1. Get presigned URL
        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: true,
          }),
        });

        if (!presignedResponse.ok) {
          toast.error("Falha ao gerar URL presignada");
          setFileState((prev) => ({
            ...prev,
            uploading: false,
            progress: 0,
            error: true,
          }));

          return;
        }

        const { presignedUrl, key } = await presignedResponse.json();

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const precentageCompleted = (event.loaded / event.total) * 100;

              setFileState((prev) => ({
                ...prev,
                progress: Math.round(precentageCompleted),
              }));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFileState((prev) => ({
                ...prev,
                progress: 100,
                uploading: false,
                key: key,
              }));

              onChange?.(key);

              toast.success("Arquivo enviado com sucesso");

              resolve();
            } else {
              reject(new Error("Upload failed..."));
            }
          };

          xhr.onerror = () => {
            reject(new Error("Upload failed..."));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch {
        toast.error("Falha ao enviar arquivo");

        setFileState((prev) => ({
          ...prev,
          progress: 0,
          error: true,
          uploading: false,
        }));
      }
    },
    [onChange]
  );

  async function removeFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      if (!response.ok) {
        toast.error("Falha ao deletar arquivo");

        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));

        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState(() => ({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      }));

      toast.success("Arquivo deletado com sucesso");
    } catch {
      toast.error("Falha ao deletar arquivo. Por favor, tente novamente.");

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl]
  );

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderLogoUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.objectUrl) {
      return (
        <RenderLogoUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleDelete={removeFile}
          fileType={fileState.fileType}
        />
      );
    }

    return <RenderLogoEmptyState isDragActive={isDragActive} />;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_SIZE,
  });

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  return (
    <div className="flex flex-col items-center gap-4 ">
      <div {...getRootProps()} className="relative">
        <div
          className={cn(
            "group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/20"
          )}
        >
          <input type="file" {...getInputProps()} />
          {renderContent()}
        </div>
      </div>

      <div className="text-center space-y-0.5">
        <p className="text-sm font-medium">
          {fileState.objectUrl ? "Logotipo enviado" : "Carregar logotipo"}
        </p>
        <p className="text-xs text-muted-foreground">PNG, JPG até 2 MB</p>
      </div>

      {fileState.error && <p>Erro ao realizar upload</p>}
    </div>
  );
}
