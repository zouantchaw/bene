import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from "@/components/ui/button"

export const CreateProduct = ({ variant }) => {
  return (
    <Link 
      className={cn(buttonVariants({ variant, size: "sm" }))}
      href="/dashboard/inventory/create"
    >
      Create Product
    </Link>
  )
};