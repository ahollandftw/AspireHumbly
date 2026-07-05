import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-neutral-800",
        outline:
          "border border-black bg-transparent text-black hover:bg-black hover:text-white",
        ghost: "hover:bg-neutral-100 text-black",
        secondary: "bg-neutral-100 text-black hover:bg-neutral-200",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 text-sm tracking-widest uppercase",
        sm: "h-10 px-6 text-xs tracking-widest uppercase",
        lg: "h-14 px-10 text-sm tracking-widest uppercase",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
