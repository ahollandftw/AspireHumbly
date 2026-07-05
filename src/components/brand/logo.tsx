import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram" | "wordmark";
  size?: "sm" | "md" | "lg" | "hero";
}

export function Logo({ className, variant = "full", size = "md" }: LogoProps) {
  const sizes = {
    sm: { mono: 32, word: "text-xs", tag: "text-[8px]" },
    md: { mono: 48, word: "text-sm", tag: "text-[10px]" },
    lg: { mono: 72, word: "text-base", tag: "text-xs" },
    hero: { mono: 120, word: "text-xl", tag: "text-sm" },
  };

  const s = sizes[size];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {(variant === "full" || variant === "monogram") && (
        <svg
          viewBox="0 0 120 80"
          width={s.mono * 1.5}
          height={s.mono}
          aria-label="Aspire Humbly AH monogram"
          className="text-black"
        >
          <text
            x="60"
            y="68"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="72"
            letterSpacing="-4"
          >
            AH
          </text>
        </svg>
      )}
      {(variant === "full" || variant === "wordmark") && (
        <>
          <span
            className={cn(
              "mt-2 font-medium tracking-[0.35em] text-black uppercase",
              s.word
            )}
          >
            Aspire Humbly
          </span>
          {variant === "full" && (
            <span
              className={cn(
                "mt-2 tracking-[0.25em] text-neutral-500 uppercase",
                s.tag
              )}
            >
              Work Hard. Stay Humble.
            </span>
          )}
        </>
      )}
    </div>
  );
}
