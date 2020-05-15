import HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
import { ChatPostMessageArguments } from "@slack/web-api";

export default class Slack {
  public static postMessage(
    webhookUrl: string,
    message: ChatPostMessageArguments
  ): void {
    const option = {
      method: "post" as HttpMethod,
      contentType: "application/json",
      payload: JSON.stringify(message),
    };
    UrlFetchApp.fetch(webhookUrl, option);
  }
}
