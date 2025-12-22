import prisma from "@/lib/db";
import { Header } from "../_components/header-catalog";
import { notFound } from "next/navigation";
import { Footer } from "../_components/footer";

interface StoreFrontLayoutProps {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}

async function getOrganization(subdomain: string) {
  const org = await prisma.organization.findUnique({
    where: { subdomain },
    include: {
      catalogSettings: true,
    },
  });

  return org;
}

export default async function SubdomainLayout({
  children,
  params,
}: StoreFrontLayoutProps) {
  const { subdomain } = await params;

  const org = await getOrganization(subdomain);

  if (!org) {
    notFound();
  }

  if (!org.catalogSettings) {
    notFound();
  }

  const settings = org.catalogSettings;

  return (
    <div className="bg-accent-foreground/5">
      <Header
        settings={{ metaTitle: settings.metaTitle, theme: settings.theme }}
      />
      <main className="mt-15 sm:mt-19">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
