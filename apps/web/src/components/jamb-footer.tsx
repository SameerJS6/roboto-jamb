"use client";

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import { useState } from "react";
import type { QueryJambFooterDataResult } from "@/lib/sanity/sanity.types";

type SanityFooterLink = {
  _key: string;
  _type: "footerLink";
  label: string;
  href: string;
};

type SanityFooterSection = {
  _key: string;
  _type: "footerSection";
  title: string;
  links?: SanityFooterLink[];
  isStandalone?: boolean;
};

type SanityFooterColumn = {
  _key: string;
  _type: "footerColumn";
  sections: SanityFooterSection[];
};

type SanityFooterContactInfo = {
  _type: "contactInfo";
  phone: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
};

type SanityFooterNewsletter = {
  _type: "newsletterConfig";
  title: string;
  inputPlaceholder: string;
  buttonText: string;
  privacyText: string;
  privacyPolicyLink?: string;
};

export type SanityFooterData = {
  _id: string;
  _type: "jambFooter";
  _createdAt: string;
  _updatedAt: string;
  contactInfo: SanityFooterContactInfo;
  newsletter: SanityFooterNewsletter;
  columns: SanityFooterColumn[];
};

export function JambFooter({
  footerData,
}: {
  footerData: NonNullable<QueryJambFooterDataResult>;
}) {
  const [agreed, setAgreed] = useState(false);

  return (
    <footer className="bg-[#E3E3E3]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1 text-muted-foreground text-sm">
            <p>Tel: {footerData.contactInfo?.phone}</p>
            <p>{footerData.contactInfo?.addressLine1}</p>
            <p>{footerData.contactInfo?.addressLine2}</p>
          </div>

          <div className="text-muted-foreground text-sm">
            <p>{footerData.contactInfo?.email}</p>
          </div>

          <div className="lg:col-span-1">
            <h3 className="mb-4 text-muted-foreground text-sm">
              {footerData.newsletter?.title}
            </h3>
            <div className="flex gap-2">
              <Input
                className="bg-background"
                placeholder={
                  footerData?.newsletter?.inputPlaceholder ??
                  "Enter your email address"
                }
                type="email"
              />
              <Button
                className="whitespace-nowrap bg-transparent"
                variant="outline"
              >
                {footerData?.newsletter?.buttonText ?? "Subscribe"}
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Checkbox
                checked={agreed}
                id="privacy"
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                className="cursor-pointer text-muted-foreground text-xs"
                htmlFor="privacy"
              >
                {footerData?.newsletter?.privacyText ?? "I agree"}
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {footerData?.columns?.map((column) => (
            <div key={column._key}>
              {column?.sections?.map((section, sectionIndex) => (
                <div
                  className={sectionIndex > 0 ? "mt-8" : ""}
                  key={section._key}
                >
                  <h3 className="mb-4 break-words border-t pt-4 font-semibold text-foreground text-sm">
                    {section.title}
                  </h3>
                  {!section.isStandalone &&
                    section.links &&
                    section.links.length > 0 && (
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link._key}>
                            <Link
                              className="link-effect relative inline-block break-words text-muted-foreground text-sm transition-colors after:bottom-0 hover:after:origin-left hover:after:scale-x-100"
                              href={link?.href ?? ""}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
