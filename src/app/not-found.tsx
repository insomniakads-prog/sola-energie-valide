import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-7xl font-bold text-primary">
        404
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Page introuvable
      </p>
      <p className="mt-2 text-gray-500">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary/90 hover:scale-[1.03]"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
