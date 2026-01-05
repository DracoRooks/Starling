import React from 'react';
import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderIcon className="size-10 animate-spin" />
    </div>
  );
};

export default PageLoader;