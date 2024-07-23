"use server";

import {currentUser} from "~/auth/lib/auth";

import {getSignedURL} from "./actions/get-signed-url";
import {addMedia} from "./data";

import {computeSHA256} from "@/lib/utils/compute-sha256";

export const createMedia = async (file: File) => {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  try {
    const checkSum = await computeSHA256(file);

    const signedUrlResult = await getSignedURL({
      type: file.type,
      size: file.size,
      checkSum,
    });

    if (signedUrlResult.error !== undefined)
      return {error: {message: signedUrlResult.error.message}};

    const signedUrl = signedUrlResult.success.url;

    const [mediaId] = await Promise.all([
      addMedia({
        type: "pdf",
        userId: user.id!,
        url: signedUrl.split("?")[0],
        text: "",
      }),
      fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      }),
    ]);

    if (!mediaId) return {error: {message: "Failed to upload media"}};

    return {success: {mediaId}};
  } catch (e: unknown) {
    return {error: {message: "Failed to upload media"}};
  }
};
