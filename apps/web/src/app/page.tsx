import { PageBuilder } from "@/components/page-builder";
import { sanityFetch } from "@/lib/sanity/live";
import { queryHomePageData } from "@/lib/sanity/query";
import { getSEOMetadata } from "@/lib/seo";

async function fetchHomePageData() {
  return await sanityFetch({
    query: queryHomePageData,
  });
}

export async function generateMetadata() {
  const { data: homePageData } = await fetchHomePageData();
  return getSEOMetadata(
    homePageData
      ? {
          title: homePageData?.title ?? homePageData?.seoTitle ?? "",
          description:
            homePageData?.description ?? homePageData?.seoDescription ?? "",
          slug: homePageData?.slug,
          contentId: homePageData?._id,
          contentType: homePageData?._type,
        }
      : {}
  );
}

export default async function Page() {
  const { data: homePageData } = await fetchHomePageData();

  if (!homePageData) {
    return <div>No home page data</div>;
  }

  const { _id, _type, pageBuilder } = homePageData ?? {};

  return (
    <>
      {/* <ModeToggle /> */}
      {/* <MainColumnTest /> */}
      {/* <JambImageGridTest /> */}
      {/* <JambImageGrid
        features={[
          {
            icon: "/test-image-1.png",
            iconAlt: "Test Image 1",
            title: "Lorem Ipsum",
            description: "Subtitle",
          },
          {
            icon: "/test-image-2.png",
            iconAlt: "Test Image 2",
            title: "Dolor Sit",
            description: "Ut labore et dolore magna aliqua.",
          },
          {
            icon: "/test-image-1.png",
            iconAlt: "Test Image 1",
            title: "Amet Consectetur",
            description: "Ut enim ad minim veniam, quis nostrud.",
          },
          {
            icon: "/test-image-2.png",
            iconAlt: "Test Image 2",
            title: "Adipiscing Elit",
            description: "Duis aute irure dolor in reprehenderit.",
          },
          {
            icon: "/test-image-1.png",
            iconAlt: "Test Image 1",
            title: "Sed Do Eiusmod",
            description: "Ut enim ad minim veniam, quis nostrud.",
          },
          {
            icon: "/test-image-2.png",
            iconAlt: "Test Image 2",
            title: "Tempor Incididunt",
            description: "Ut enim ad minim veniam, quis nostrud.",
          },
        ]}
      /> */}
      {/* <MainColumnLayoutComponent image="/test-image-1.png" />
      <MainColumnLayoutComponent image="/test-image-2.png" />
      <MainColumnLayoutComponent image="https://images.unsplash.com/photo-1761845359334-9866fb7f23e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2118" /> */}
      <PageBuilder id={_id} pageBuilder={pageBuilder ?? []} type={_type} />
    </>
  );
}
