import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const DragDrop = ({ setProductImage }) => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    console.log(`🚀 ~ handleChange ~ file:`, file);
    setProductImage(file);
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
};

export default DragDrop;
