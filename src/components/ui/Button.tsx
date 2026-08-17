"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl font-semibold",
          "transition-colors duration-300 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden",
          // Variants
          variant === "primary" &&
            "bg-primary text-white shadow-lg shadow-primary/25",
          variant === "secondary" &&
            "bg-secondary text-white",
          variant === "outline" &&
            "border-2 border-primary text-primary hover:bg-primary hover:text-white",
          variant === "ghost" &&
            "text-primary hover:bg-primary/10",
          // Sizes
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
