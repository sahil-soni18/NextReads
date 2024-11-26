// "use client";
// import React, { useState } from "react";
// import { FileUpload } from "@/components/ui/file-upload";

// export function FileUploadDemo() {
//   const [files, setFiles] = useState<File[]>([]);
//   const handleFileUpload = (files: File[]) => {
//     setFiles(files);
//     console.log(files);
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
//       <FileUpload onChange={handleFileUpload} />
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="relative left-80 w-full mt-[60px] max-w-xs mx-auto min-h-40 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-2 text-xs shadow-md">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}





