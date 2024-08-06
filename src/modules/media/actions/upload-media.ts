"use server";

import {currentUser} from "~/auth/lib/auth";

type MediaUploadDto = {
  file: File;
  signedUrl: string;
};

export async function uploadMedia({file, signedUrl}: MediaUploadDto) {
  const user = await currentUser();

  if (!user) return {error: {message: "User not found"}};

  const data = new FormData();

  data.set("file", file);

  await fetch(signedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  return {success: {message: "Successfully uploaded media"}};
}
