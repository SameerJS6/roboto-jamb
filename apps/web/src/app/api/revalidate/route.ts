import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-webhook-secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      {
        message: "Invalid secret",
      },
      { status: 401 }
    );
  }

  try {
    revalidatePath("/", "page");
    revalidatePath("/[slug]", "page");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 }
    );
  }
}
