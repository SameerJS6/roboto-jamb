import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("=== WEBHOOK DEBUG ===");
  console.log("URL:", request.url);
  console.log(
    "Search Params:",
    Object.fromEntries(request.nextUrl.searchParams)
  );
  console.log("Headers:", Object.fromEntries(request.headers));

  const secret = request.headers.get("x-sanity-webhook-secret");

  console.log("secret", secret);

  console.log("Received secret:", secret);
  console.log("Expected secret:", process.env.SANITY_REVALIDATE_SECRET);
  console.log(
    "Secrets match:",
    secret === process.env.SANITY_REVALIDATE_SECRET
  );

  try {
    const body = await request.json();
    console.log("Body:", JSON.stringify(body, null, 2));
  } catch (e) {
    console.log("No JSON body or error parsing:", e);
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      {
        message: "Invalid secret",
        received: secret ?? "no secret",
      },
      { status: 401 }
    );
  }

  try {
    revalidatePath("/", "page");
    revalidatePath("/[slug]");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 }
    );
  }
}
