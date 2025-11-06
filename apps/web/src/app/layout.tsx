import "@workspace/ui/globals.css";
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
        <meta content={"#f3f0ed"} name="theme-color" />
      </head>
      <body className={`${fontGalaxieCopernicus.variable} antialiased`}>
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
      </body>
    </html>
  );
}
