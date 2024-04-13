import React, { useRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Form from "../Form";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";

interface ImageUploadProps {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  value?: File | null;
  register: UseFormRegister<FieldValues>;
  onChange?: (val: File | null) => void;
  imgUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  name,
  register,
  value,
  onChange: onImageUploadHandler,
  imgUrl,
  error,
  required = false,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const acceptFileTypes = "image/*";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const returnImgUrl = (file: File | null) => {
    if (file?.type === "image/png" || file?.type === "image/jpeg") {
      return URL.createObjectURL(file);
    }
    return "/file_icon.png";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      !!onImageUploadHandler && onImageUploadHandler(file);
      setImage(file);
    } else {
      setImage(null);
      !!onImageUploadHandler && onImageUploadHandler(null);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImage(null);
    !!onImageUploadHandler && onImageUploadHandler(null);
  };

  return (
    <Form.FormGroup otherStyles={`mb-1`}>
      {label && (
        <Form.Label>
          {label} {required ? <span className="text-red-600">*</span> : null}
        </Form.Label>
      )}

      {image || value || imgUrl ? (
        <label className=" flex items-center justify-center h-36 w-28 border-solid border  border-gray-300 rounded-md cursor-pointer">
          <label htmlFor={name} className=" relative h-full w-full">
            <img
              onClick={(e) => e.preventDefault()}
              src={
                imgUrl || image
                  ? returnImgUrl(image)
                  : returnImgUrl(value || null)
              }
              className="h-full w-full object-cover object-center rounded-md"
            />
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
      ) : (
        <label className="flex items-center justify-center h-36 w-28 border-dashed border-2 border-gray-300 rounded-md cursor-pointer">
          <input
            type="file"
            accept={acceptFileTypes}
            {...register(name)}
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-gray-400 px-2 text-center">
            <FaUpload size={40} className="ml-6  mb-2" />
            Click to upload Image
          </span>
        </label>
      )}
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default ImageUpload;

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
      className="absolute top-[70%] left-[20%]  bg-[#28c76f] flex items-center justify-center w-8 h-8 boder border-solid boder-[rgba(0, 0, 0, 0.2)] outline-none rounded-lg transition-all duration-200 ease-linear z-10 hover:brightness-[90%] cursor-pointer"
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
