import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/brand/aspire-humbly-logo.png";

interface LogoProps {
  className?: string;
  /** full = complete mark, compact = cropped for nav/header */
  variant?: "full" | "compact";
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
}

const heights = {
  sm: 40,
  md: 56,
  lg: 80,
  hero: 160,
};

export function Logo({
  className,
  variant = "full",
  size = "md",
  priority = false,
}: LogoProps) {
  const height = heights[size];
  const width = Math.round(height * 0.85);

  if (variant === "compact") {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ width, height }}
      >
        <Image
          src={LOGO_SRC}
          alt="Aspire Humbly"
          width={width}
          height={Math.round(height * 2.2)}
          className="absolute top-0 left-0 max-w-none object-cover object-top"
          style={{ width, height: Math.round(height * 2.2) }}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="Aspire Humbly — Work Hard. Stay Humble."
      width={width}
      height={height}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height, width: "auto", maxWidth: Math.round(height * 1.1) }}
      priority={priority}
    />
  );
}
