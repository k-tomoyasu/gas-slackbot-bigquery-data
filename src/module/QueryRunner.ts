import BigQueryClient = GoogleAppsScript.Bigquery;
import QueryResultParser from "./QueryResultParser";

export default class QueryRunner {
  constructor(private projectId: string, private client: BigQueryClient) {}

  public query(query: string): Map<string, string>[] {
    const request = { query };
    const job = this.client.Jobs.query(request, this.projectId);
    const jobId = job.jobReference.jobId;
    // Check on status of the Query Job.
    let sleepTimeMs = 500;
    while (!job.jobComplete) {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs *= 2;
    }
    let queryResults = this.client.Jobs.getQueryResults(this.projectId, jobId);
    // Logger.log(queryResults.rows);
    let rows = QueryResultParser.parse(queryResults);
    while (queryResults.pageToken) {
      queryResults = this.client.Jobs.getQueryResults(this.projectId, jobId, {
        pageToken: queryResults.pageToken,
      });
      rows = rows.concat(QueryResultParser.parse(queryResults));
    }

    return rows;
  }
}
