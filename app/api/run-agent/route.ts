import { runWorkflow } from "@/lib/workflow";

export async function POST(req: Request) {
  const { input_text, image_base64 } = await req.json();

  let cleanImage = null;

  if (image_base64) {
    // Remove "data:image/...;base64," prefix
    cleanImage = image_base64.replace(/^data:image\/\w+;base64,/, "");
  }

  const result = await runWorkflow({
    input_as_text: input_text ?? "",
    image_base64: cleanImage
  });

  return Response.json(result);
}
