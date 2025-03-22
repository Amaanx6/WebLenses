import * as React from "react"
import { cn } from "../../lib/utils" // Update the path to the correct location of the utils file

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border",
        variant === "default"
          ? "bg-secondary text-secondary-foreground border-transparent"
          : variant === "secondary"
            ? "bg-muted text-muted-foreground border-transparent"
            : "bg-transparent border-border hover:bg-secondary hover:text-secondary-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }

