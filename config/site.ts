import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Bene",
  description:
    "Manage your party rental business with ease.",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  links: {
    twitter: "https://twitter.com/rentbene",
    github: "https://github.com/mickasmt/next-saas-stripe-starter", 
  },
  mailSupport: "support@rentbene.com"
}
