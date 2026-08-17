import { FunnelHeader } from "@/components/layout/FunnelChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Le header est allégé — une seule sortie, pour ne pas détourner du
 * formulaire — mais le footer est celui du site, à l'identique.
 */
export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <FunnelHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
