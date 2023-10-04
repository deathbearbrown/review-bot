import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { PostReviewRequestMessage } from "../functions/post_review_message.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const SubmitReviewRequestWorkflow = DefineWorkflow({
  callback_id: "submitreview",
  title: "Submit an review request",
  description: "Submit an review request to the channel",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel", "interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = SubmitReviewRequestWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Submit an review request",
    interactivity: SubmitReviewRequestWorkflow.inputs.interactivity,
    submit_label: "Submit",
    fields: {
      elements: [{
        name: "severity",
        title: "Severity of review request",
        type: Schema.types.string,
        enum: [":white_circle:", ":large_blue_circle:", ":red_circle:"],
        choices: [
          {
            value: "low",
            title: ":white_circle:  Low",
            description: "Low severity",
          },
          {
            value: "medium",
            title: ":large_blue_circle:  Medium",
            description: "Medium severity",
          },
          {
            value: "high",
            title: ":red_circle:  High",
            description: "High severity",
          },
        ],
      }, {
        name: "description",
        title: "Description of review request",
        type: Schema.types.string,
        long: true,
      }, {
        name: "link",
        title: "Relevant link or URL",
        type: Schema.types.string,
      }],
      required: ["severity", "description"],
    },
  },
);

/**
 * Custom functions are reusable building blocks
 * of automation deployed to Slack infrastructure. They
 * accept inputs, perform calculations, and provide
 * outputs, just like typical programmatic functions.
 * https://api.slack.com/automation/functions/custom
 */
SubmitReviewRequestWorkflow.addStep(
  PostReviewRequestMessage,
  {
    channel: SubmitReviewRequestWorkflow.inputs.channel,
    submitting_user: inputForm.outputs.interactivity.interactor.id,
    severity: inputForm.outputs.fields.severity,
    description: inputForm.outputs.fields.description,
    link: inputForm.outputs.fields.link,
  },
);

export default SubmitReviewRequestWorkflow;
