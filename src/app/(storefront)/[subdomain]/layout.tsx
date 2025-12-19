import prisma from "@/lib/db";
import { Header } from "../_components/header-catalog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: StoreFrontLayoutProps): Promise<Metadata> {
  const { subdomain } = await params;

  const org = await getOrganization(subdomain);

  if (!org) {
    return {
      title: "Organização não encontrada",
    };
  }

  const { catalogSettings } = org;

  return {
    title: catalogSettings?.metaTitle || org.name,
    description: catalogSettings?.metaDescription || org.name,
  };
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

  const settings = org.catalogSettings;

  return (
    <div className="bg-accent-foreground/5">
      <Header />
      <main className="mt-15 sm:mt-19">{children}</main>
    </div>
  );
}
