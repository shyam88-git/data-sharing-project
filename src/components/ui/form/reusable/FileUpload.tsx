import React, { useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Form from "../Form";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaFileArchive } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IconType } from "react-icons";

interface FileUploadProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  register: UseFormRegister<FieldValues>;
  value?: File | null;
  onChange?: (val: File | null) => void;
  fileUrl?: string;
  icon?: IconType;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  value,
  fileUrl,
  onChange: onFileUploadHandler,
  icon,
}) => {
  const Icon = icon || IoMdAdd;

  const [upoadedFile, setUploadedFile] = useState<File | null>(null);
  const acceptFileTypes =
    "application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/zip";

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      !!onFileUploadHandler && onFileUploadHandler(file);
      setUploadedFile(file);
    } else {
      setUploadedFile(null);
      !!onFileUploadHandler && onFileUploadHandler(null);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUploadedFile(null);
    !!onFileUploadHandler && onFileUploadHandler(null);
  };

  return (
    <Form.FormGroup otherStyles={`mb-1`}>
      {label && (
        <Form.Label>
          {label} {required ? <span className="text-red-600">*</span> : null}
        </Form.Label>
      )}

      {upoadedFile || value || fileUrl ? (
        <>
          <label className=" flex items-center justify-center h-32 w-24 border-solid border  border-gray-300 rounded-md cursor-pointer">
            <label htmlFor={name} className=" relative h-full w-full">
              <FaFileArchive
                onClick={(e: any) => e.preventDefault()}
                className="h-full w-full"
              />
              {/* <img
              onClick={(e) => e.preventDefault()}
              src={
                imgUrl || image
                  ? returnImgUrl(image)
                  : returnImgUrl(value || null)
              }
              className="h-full w-full object-cover object-center rounded-md"
            /> */}
              <EditButton onClick={handleEditClick}>
                <FaEdit size={16} />
              </EditButton>
              <CloseButton onClick={handleClose}>
                <FaDeleteLeft size={16} />
              </CloseButton>
            </label>
            <input
              type="file"
              accept={acceptFileTypes}
              {...register(name)}
              onChange={handleChange}
              className="hidden"
              ref={fileInputRef}
            />
          </label>
          <p>{upoadedFile?.name}</p>
        </>
      ) : (
        <label className="flex items-center justify-center h-32 w-24 border-dashed border-2 border-gray-300 rounded-md cursor-pointer">
          <input
            type="file"
            accept={acceptFileTypes}
            {...register(name)}
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-gray-400 px-2 text-center">
            <Icon size={40} className="ml-4 " />
            Click to add File
          </span>
        </label>
      )}
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default FileUpload;

const EditButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: any;
}) => {
  return (
    <span
      onClick={onClick}
      className="absolute top-[70%] left-[15%]  bg-[#28c76f] flex items-center justify-center w-8 h-8 boder border-solid boder-[rgba(0, 0, 0, 0.2)] outline-none rounded-lg transition-all duration-200 ease-linear z-10 hover:brightness-[90%] cursor-pointer"
    >
      {children}
    </span>
  );
};
const CloseButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: any;
}) => {
  return (
    <span
      onClick={onClick}
      className="absolute top-[70%] left-[55%] bg-prmary-gray-500 flex items-center justify-center w-8 h-8 bg-red-400 outline-none rounded-lg transition-all duration-200 ease-linear  z-10 hover:brightness-[90%] cursor-pointer"
    >
      {children}
    </span>
  );
};
