import { runWorkflow } from "@/lib/workflow";

export async function POST(req: Request) {
  const { input_text, image_base64 } = await req.json();

  const result = await runWorkflow({
    input_as_text: input_text ?? "",
    image_base64: image_base64 ?? null
  });

  return Response.json(result);
}
