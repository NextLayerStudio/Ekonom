import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { saveImage, validateImageFile } from "@/lib/upload";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Neautorizované." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Neplatná požiadavka." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Vyberte obrázok." }, { status: 422 });
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  try {
    const url = await saveImage(file);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Nahrávanie zlyhalo." }, { status: 500 });
  }
}
