"use server";

export async function getTextFromMedia(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const textResult = await fetch(`${process.env.API_URL}/v1/documents/upload`, {
    method: "POST",
    body: formData,
  });

  return textResult.json().then((result) => {
    console.log(result.text);

    return result.text;
  });
}
