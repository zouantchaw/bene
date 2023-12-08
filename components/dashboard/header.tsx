import Link from "next/link"
import { Icons } from "@/components/shared/icons";
interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  backLink?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  backLink,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        {backLink && <Link href={backLink} className="flex items-center text-sm text-muted-foreground">
          <Icons.arrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>}
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
