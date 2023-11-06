"use client";

import useScroll from "@/hooks/use-scroll";
import { MainNavItem } from "@/types";
import { User } from "next-auth";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Icons } from "@/components/shared/icons";

interface NavBarProps {
  user: Pick<User, "name" | "image" | "email"> | undefined
  items?: MainNavItem[]
  children?: React.ReactNode
  rightElements?: React.ReactNode
  scroll?: boolean
}

export function NavBar({ user, items, children, rightElements, scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const signInModal = useSigninModal();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? scrolled
        ? "border-b"
        : "bg-background/0"
        : "border-b"}`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {!user ? (
            // <Button className="px-3" variant="outline" size="sm" onClick={signInModal.onOpen}>Sign In</Button>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" })
              )}
            >
              Sign In
            </Link>
          ) : null}

          {user ? (
            <UserAccountNav user={user} />
          ) : (
            // <Button className="px-3" variant="default" size="sm" onClick={signInModal.onOpen}>Sign In</Button>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" })
              )}
            >
              Get Started
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}