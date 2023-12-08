import { useRef, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "./icons";

interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  fileExtension?: string;
  maxFileSizeKB?: number;
  maxFiles?: number;
}

const closeIcon = (
  <Icons.close className="h-4 w-4 text-gray-400 hover:text-gray-500" />
)

export function Dropzone({ onChange, className, fileExtension, maxFileSizeKB = 1024, maxFiles = 3 }: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File) => {
    // Validate file extension
    if (fileExtension && !file.name.endsWith(`.${fileExtension}`)) {
      return `Invalid file type. Expected: .${fileExtension}`;
    }
    // Validate file size
    if (maxFileSizeKB && file.size > maxFileSizeKB * 1024) {
      return `File is too large. Maximum size is ${maxFileSizeKB} KB.`;
    }
    return null;
  }, [fileExtension, maxFileSizeKB]);

  const handleFiles = useCallback((files: FileList) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      setError(`Maximum of ${maxFiles} files can be uploaded.`);
      return;
    }
    const newFiles = Array.from(files).map(file => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return null;
      }
      return URL.createObjectURL(file);
    }).filter(Boolean) as string[];
    setUploadedFiles(prev => [...prev, ...newFiles]);
    onChange([...uploadedFiles, ...newFiles]);
    setError(null);
  }, [validateFile, onChange, uploadedFiles, maxFiles]);

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Card className={`bg-muted border-dashed border-2 hover:border-muted-foreground/50 hover:cursor-pointer ${className}`}>
        <CardContent
          className="flex flex-col items-center justify-center px-2 py-4 text-xs space-y-2"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Icons.add className="h-8 w-8 text-muted-foreground" />
          <span className="font-medium">Drag Files to Upload or Click Here</span>
          <input
            ref={fileInputRef}
            type="file"
            accept={`.${fileExtension}`} // Set accepted file type
            onChange={handleFileInputChange}
            className="hidden"
            multiple={true} // Allow multiple files
          />
        </CardContent>
        {error && <span className="text-red-500">{error}</span>}
      </Card>
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center space-x-2">
          <p>{`Uploaded File ${index + 1}: ${file}`}</p>
          <button onClick={() => removeFile(index)}>
            {closeIcon}
          </button>
        </div>
      ))}
    </div>
  );
}