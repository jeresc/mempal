"use server";

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

import {currentUser} from "~/auth/lib/auth";

import {generateMediaName} from "../utils";

const acceptedTypes = ["application/pdf"];

const maxFileSize = 1024 * 1024 * 50; // 10MB;

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACC_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface File {
  type: string;
  size: number;
  checkSum: string;
}

export async function getSignedURL({type, size, checkSum}: File) {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  if (!acceptedTypes.includes(type)) return {error: {message: "Invalid file type"}};

  if (size > maxFileSize) return {error: {message: "File too large"}};

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateMediaName(),
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

  return {success: {url: signedUrl}};
}
