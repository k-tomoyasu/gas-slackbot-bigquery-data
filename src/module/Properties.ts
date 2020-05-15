export default class Properties {
  private static getProperty(key: string): string {
    return PropertiesService.getScriptProperties().getProperty(key);
  }
  public static get bigQueryProjectId(): string {
    return this.getProperty("BIGQUERY_PROJECT_ID");
  }

  public static get bigQueryTableName(): string {
    return this.getProperty("BIGQUERY_TABLE_NAME");
  }

  public static get slackWebhookUrl(): string {
    return this.getProperty("SLACK_WEBHOOK_URL");
  }
}
