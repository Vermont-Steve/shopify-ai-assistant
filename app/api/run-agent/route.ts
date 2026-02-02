import { runWorkflow } from "@/lib/workflow";

export async function POST(req: Request) {
  const { input } = await req.json();

  const result = await runWorkflow({
    input_as_text: input
  });

  return Response.json(result);
}
