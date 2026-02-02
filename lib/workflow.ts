import { Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";

const myAgent = new Agent({
  name: "My agent",
  instructions: `Create a fun website description for each product...
  (your full instructions here)
  `,
  model: "gpt-5.2",
  modelSettings: {
    reasoning: { effort: "low", summary: "auto" },
    store: true
  }
});

type WorkflowInput = {
  input_as_text: string;
  image_base64: string | null;
};

export const runWorkflow = async (workflow: WorkflowInput) => {
  return await withTrace("Website Descriptions", async () => {
    const conversationHistory: AgentInputItem[] = [];

    if (workflow.input_as_text) {
      conversationHistory.push({
        role: "user",
        content: [
          {
            type: "input_text",
            text: workflow.input_as_text
          }
        ]
      });
    }

    if (workflow.image_base64) {
      conversationHistory.push({
        role: "user",
        content: [
          {
            type: "input_image",
            image_base64: workflow.image_base64
          }
        ]
      });
    }

    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_696154cedf1081909efeb03462afc7360eb7f439d00a4d6b"
      }
    });

    const result = await runner.run(myAgent, conversationHistory);

    if (!result.finalOutput) {
      throw new Error("Agent result is undefined");
    }

    return {
      output_text: result.finalOutput
    };
  });
};
      output_text: result.finalOutput
    };
  });
};
