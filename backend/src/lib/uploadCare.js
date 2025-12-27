import { UploadClient } from "@uploadcare/upload-client";
import { ENV } from "./env.js";

export const uploadCareClient = new UploadClient({ publicKey: ENV.UPLOAD_CARE_PUBLIC_KEY });