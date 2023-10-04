import { Manifest } from "deno-slack-sdk/mod.ts";
import { PostReviewRequestMessage } from "./functions/post_review_message.ts";
import SubmitReviewRequestWorkflow from "./workflows/submitreview.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "review-bot-app",
  description: "A basic sample that demonstrates review request submission to channel",
  icon: "assets/default_new_app_icon.png",
  workflows: [SubmitReviewRequestWorkflow],
  functions: [PostReviewRequestMessage],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
