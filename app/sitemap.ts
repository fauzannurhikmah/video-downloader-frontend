import config from "@/config";

export default function sitemap() {
  return [
    {
      url: config.SITE_URL,
      lastModified: new Date(),
    },
  ]
}