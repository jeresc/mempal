function generateRandomId(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);

    result += chars.charAt(randomIndex);
  }

  return result;
}

function generateFirestoreId(): string {
  const idLength = 20;

  return generateRandomId(idLength);
}

export {generateFirestoreId, generateRandomId};
