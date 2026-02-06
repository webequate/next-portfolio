"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const ThemedImage = () => {
  const { resolvedTheme } = useTheme();
  let src: string;

  switch (resolvedTheme) {
    case "light":
      src = "/images/allen.png";
      break;
    case "dark":
      src = "/images/allen.png";
      break;
    default:
      src = "/images/allen.png";
      break;
  }

  return (
    <Image
      src={src}
      alt="Allen"
      width={574}
      height={574}
      priority
      className="w-100 h-100 rounded-xl bg-light-1 dark:bg-dark-1 ring-1 ring-dark-3 dark:ring-light-3"
    />
  );
};

export default ThemedImage;
