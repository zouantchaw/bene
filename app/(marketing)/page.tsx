import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import { Icons } from "@/components/shared/icons";
import { env } from "@/env.mjs";

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container max-w-[64rem] flex flex-col items-center gap-5 text-center">
          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Transform Your Party Rental Business with{" "}
              <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
                Bene
              </span>
            </Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Elevate your customer experience and streamline your operations with our all-in-one rental management platform.
            </Balancer>
          </p>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Link href="/register" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Link>
            {/* <Link
              href="/features"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-4")}
            >
              Explore Features
            </Link> */}
          </div>
        </div>
      </section>

      {/* Additional sections can be added here to highlight features, testimonials, etc. */}

    </>
  )
}
