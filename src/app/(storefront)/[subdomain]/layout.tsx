import prisma from "@/lib/db";
import { Header } from "../_components/header-catalog";
import { notFound } from "next/navigation";

interface StoreFrontLayoutProps {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}

async function getOrganization(subdomain: string) {
  console.log("🔍 Buscando organização com subdomain:", subdomain);

  const org = await prisma.organization.findUnique({
    where: { subdomain },
    include: {
      catalogSettings: true,
    },
  });

  console.log("📦 Organização encontrada:", org ? org.name : "null");

  return org;
}

export default async function SubdomainLayout({
  children,
  params,
}: StoreFrontLayoutProps) {
  // ✅ AWAIT AQUI, ANTES DE USAR
  const { subdomain } = await params;

  console.log("🎯 Subdomain recebido no layout:", subdomain);

  const org = await getOrganization(subdomain);

  if (!org) {
    console.log("❌ Organização não encontrada, mostrando 404");
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
