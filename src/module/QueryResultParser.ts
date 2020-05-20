import TableFieled = GoogleAppsScript.Bigquery.Schema.TableFieldSchema;
import TableRow = GoogleAppsScript.Bigquery.Schema.TableRow;
import GetQueryResultsResponse = GoogleAppsScript.Bigquery.Schema.GetQueryResultsResponse;

export default class QueryResultParser {
  public static parse(result: GetQueryResultsResponse): Map<string, string>[] {
    return result.rows.map((row) => this.toMap(result.schema.fields, row));
  }

  private static toMap(
    fields: TableFieled[],
    row: TableRow
  ): Map<string, string> {
    return row.f.reduce((acc, cell, index) => {
      const field = fields[index].name;
      acc[field] = cell.v ? cell.v.toString() : "";
      return acc;
    }, new Map<string, string>());
  }
}
