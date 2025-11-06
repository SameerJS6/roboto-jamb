import "@workspace/ui/globals.css";
import { META_THEME_COLORS } from "@workspace/ui/hooks/use-meta-color";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Suspense } from "react";
import { preconnect } from "react-dom";
import CustomScrollbar from "@/components/custom-scrollbar";
import { Footer } from "@/components/footer";
import FooterSkeleton from "@/components/footer-skeleton";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import PageWideScrollMask from "@/components/page-wide-adaptive-scroll-mask";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { getNavigationData } from "@/lib/navigation";
import { SanityLive } from "@/lib/sanity/live";

const fontGalaxieCopernicus = localFont({
  variable: "--font-galaxie-copernicus",
  src: [
    {
      path: "../fonts/Copernicus-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../fonts/Copernicus-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  const nav = await getNavigationData();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <setting meta colors requires the use of dangerouslySetInnerHTML>
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta content={META_THEME_COLORS.light} name="theme-color" />
      </head>
      <body className={`${fontGalaxieCopernicus.variable} antialiased`}>
        <Providers>
          <Navbar navbarData={null} settingsData={nav.settingsData} />
          {children}
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
          <SanityLive />
          <ScrollToTopButton />
          <CustomScrollbar />
          <CombinedJsonLd includeOrganization includeWebsite />
          {(await draftMode()).isEnabled && (
            <>
              <PreviewBar />
              <VisualEditing />
            </>
          )}
          <PageWideScrollMask />
        </Providers>
      </body>
    </html>
  );
}
