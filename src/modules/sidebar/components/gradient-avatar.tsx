import React from "react";

// Function to generate a color from a hash
function generateColorFromHash(hash: number): string {
  // Use a simple hash function to create a value between 0 and 255
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  return `rgb(${r}, ${g}, ${b})`;
}

// Function to hash the user ID to an integer
function hashStringToInt(str: string): number {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }

  return hash;
}

// Define the props interface
interface GradientAvatarProps {
  userId: string;
  size?: number;
}

// Component to generate the avatar with gradient
function GradientAvatar({userId, size = 50}: GradientAvatarProps): JSX.Element {
  // Hash the user ID to get a consistent color pair
  const hash = hashStringToInt(userId);
  const color1 = generateColorFromHash(hash);
  const color2 = generateColorFromHash(hash >> 16); // Shift hash for a different color

  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${color1}, ${color2})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: size / 3,
    fontWeight: "bold",
  };

  return <div style={style} />;
}

export {GradientAvatar};
