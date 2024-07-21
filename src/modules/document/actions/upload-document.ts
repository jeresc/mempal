"use server";

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

import {currentUser} from "~/auth/lib/auth";

import {generateFileName} from "../utils";
import {createDocument} from "../api";
import {Document} from "../types";

const acceptedTypes = ["application/pdf"];

const maxFileSize = 1024 * 1024 * 10; // 10MB;

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type UploadDocumentDto = Omit<Document, "id" | "createdAt" | "userId"> & {
  type: string;
  size: number;
  checkSum: string;
};

export async function uploadDocument({type, size, checkSum}: UploadDocumentDto) {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  if (!acceptedTypes.includes(type)) return {error: {message: "Invalid file type"}};

  if (size > maxFileSize) return {error: {message: "File too large"}};

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checkSum,
    Metadata: {
      userId: user.id!,
    },
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  const docId = await createDocument({
    type: "pdf",
    userId: user.id!,
    url: signedUrl.split("?")[0],
    text: "",
    title: "",
  });

  return {success: {url: signedUrl, docId}};
}
