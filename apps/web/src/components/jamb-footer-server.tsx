import { JambFooter } from "@/components/jamb-footer";
import { JambFooterSkeleton } from "@/components/jamb-footer-skeleton";
import { sanityFetch } from "@/lib/sanity/live";
import { queryJambFooterData } from "@/lib/sanity/query";

export async function JambFooterServer() {
  const response = await sanityFetch({
    query: queryJambFooterData,
  });

  if (!response?.data) {
    return <JambFooterSkeleton />;
  }

  return <JambFooter footerData={response.data} />;
}
