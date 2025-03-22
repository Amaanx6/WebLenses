// src/components/ui/button.tsx
"use client"

import { forwardRef } from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon" // Add "icon" here
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variant styles
          variant === "default" && "bg-gray-800 text-white hover:bg-gray-700",
          variant === "outline" && "border border-gray-700 bg-transparent hover:bg-gray-800",
          variant === "ghost" && "bg-transparent hover:bg-gray-800",
          // Size styles
          size === "default" && "px-4 py-2",
          size === "sm" && "px-3 py-1 text-xs",
          size === "lg" && "px-6 py-3 text-base",
          size === "icon" && "h-10 w-10", // Add icon size styling
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }