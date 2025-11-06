import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

const DRAFT_MODE_DISABLE_DELAY_MS = 1000;

export async function GET(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.searchParams);
  const redirectUrl = params.get("slug") || "/";

  (await draftMode()).disable();
  await new Promise((resolve) =>
    setTimeout(resolve, DRAFT_MODE_DISABLE_DELAY_MS)
  );
  redirect(redirectUrl);
}
