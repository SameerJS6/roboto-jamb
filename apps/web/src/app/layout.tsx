import "@workspace/ui/globals.css";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Suspense } from "react";
import { preconnect } from "react-dom";
import CustomScrollbar from "@/components/custom-scrollbar";
import { FooterServer, FooterSkeleton } from "@/components/footer";
import { JambFooterServer } from "@/components/jamb-footer-server";
import { JambFooterSkeleton } from "@/components/jamb-footer-skeleton";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
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
      <body className={`${fontGalaxieCopernicus.variable} antialiased`}>
        <Providers>
          <Navbar navbarData={null} settingsData={nav.settingsData} />
          {children}
          {/* Sanity Footer */}
          <Suspense fallback={<JambFooterSkeleton />}>
            <JambFooterServer />
          </Suspense>
          {/* Default Footer */}
          <div className="mb-8">
            {/* <div className="mb-2 text-center font-semibold text-lg">
              Default Footer
            </div> */}
            {/* <JambFooter footerData={DEFAULT_FOOTER_DATA} /> */}
          </div>
          {/* Test Footers */}
          {/* {ALL_TEST_FOOTERS.map((testFooter) => (
            <div className="mb-8" key={testFooter.data._id}>
              <div className="mb-2 text-center font-semibold text-lg">
                Test: {testFooter.name}
              </div>
              <JambFooter footerData={testFooter.data} />
            </div>
          ))} */}
          <Suspense fallback={<FooterSkeleton />}>
            <FooterServer />
          </Suspense>
          <SanityLive />
          <CustomScrollbar />
          <CombinedJsonLd includeOrganization includeWebsite />
          {(await draftMode()).isEnabled && (
            <>
              <PreviewBar />
              <VisualEditing />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
