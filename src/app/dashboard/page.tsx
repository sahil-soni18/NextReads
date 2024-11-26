"use client";
import React, { useState } from "react";
import { FileUploadDemo } from "@/components/fileupload";
import { DetailsDemo } from "@/components/details";

const dashboard = () => {
  return (
    <div>
      <FileUploadDemo/>
      <DetailsDemo/>
    </div>
  )
}

export default dashboard
