import { stegaClean } from "next-sanity";
import type {
  ContactPoint,
  ImageObject,
  Organization,
  WebSite,
  WithContext,
} from "schema-dts";
import type { QuerySettingsDataResult } from "@/lib/sanity/sanity.types";
import { getBaseUrl } from "@/utils";

// Utility function to safely render JSON-LD
export function JsonLdScript<T>({ data, id }: { data: T; id: string }) {
  return (
    <script id={id} type="application/ld+json">
      {JSON.stringify(data, null, 0)}
    </script>
  );
}

// Organization JSON-LD Component
type OrganizationJsonLdProps = {
  settings: QuerySettingsDataResult;
};

export function OrganizationJsonLd({ settings }: OrganizationJsonLdProps) {
  if (!settings) {
    return null;
  }

  const baseUrl = getBaseUrl();

  // Social links are not currently implemented in settings

  const organizationJsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteTitle,
    description: settings.siteDescription || undefined,
    url: baseUrl,
    logo: settings.logo
      ? ({
          "@type": "ImageObject",
          url: settings.logo,
        } as ImageObject)
      : undefined,
    contactPoint: settings.contactEmail
      ? ({
          "@type": "ContactPoint",
          email: settings.contactEmail,
          contactType: "customer service",
        } as ContactPoint)
      : undefined,
  };

  return <JsonLdScript data={organizationJsonLd} id="organization-json-ld" />;
}

// Website JSON-LD Component
type WebSiteJsonLdProps = {
  settings: QuerySettingsDataResult;
};

export function WebSiteJsonLd({ settings }: WebSiteJsonLdProps) {
  if (!settings) {
    return null;
  }

  const baseUrl = getBaseUrl();

  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteTitle,
    description: settings.siteDescription || undefined,
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: settings.siteTitle,
    } as Organization,
  };

  return <JsonLdScript data={websiteJsonLd} id="website-json-ld" />;
}

// Combined JSON-LD Component for pages with multiple structured data
type CombinedJsonLdProps = {
  includeWebsite?: boolean;
  includeOrganization?: boolean;
};

export function CombinedJsonLd({
  includeWebsite = false,
  includeOrganization = false,
}: CombinedJsonLdProps) {
  // For now, we'll create a simple settings object since we don't have the query
  // This can be updated when settings are needed
  const settings: QuerySettingsDataResult = {
    _id: "settings",
    _type: "settings",
    siteTitle: "Website",
    siteDescription: "Website description",
    logo: null,
    contactEmail: null,
  };

  const cleanSettings = stegaClean(settings);
  return (
    <>
      {includeWebsite && cleanSettings && (
        <WebSiteJsonLd settings={cleanSettings} />
      )}
      {includeOrganization && cleanSettings && (
        <OrganizationJsonLd settings={cleanSettings} />
      )}
    </>
  );
}
