import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import SubmitReviewRequestWorkflow from "../workflows/submit_review_request.ts";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const submitReviewRequest: Trigger<typeof SubmitReviewRequestWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Review Needed",
  description: "Submit a link to something that needs to be reviewed e.g. phab, tech spec, figma docs",
  workflow: "#/workflows/submitreview",
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
  },
};

export default submitReviewRequest;
