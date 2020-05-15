import { ChatPostMessageArguments, MessageAttachment } from "@slack/web-api";

import Properties from "./module/Properties";
import QueryRunner from "./module/QueryRunner";
import Slack from "./module/Slack";

function notifyDau() {
  const queryRunner = new QueryRunner(Properties.bigQueryProjectId, Bigquery);
  const rows = queryRunner.query(`
    #StandardSQL
    SELECT
      platform
      ,count(distinct(user_pseudo_id)) as dau
      ,sum(case when event_name = "first_open" then 1 else 0 end) as first_open_count
    FROM
      \`${Properties.bigQueryTableName}_*\`
    WHERE
      _TABLE_SUFFIX = FORMAT_DATE("%Y%m%d", DATE_ADD(CURRENT_DATE(),  interval - 1 day))
    GROUP BY
      platform  
    ORDER BY 
      platform DESC  
    `);

  const attachments: MessageAttachment[] = rows.map(row => {
    return {
      title: row["platform"],
      color: "#008080",
      fields: [
        {
          title: "DAU",
          value: row["dau"],
        },
        {
          title: "First Open",
          value: row["first_open_count"],
        },
      ],
    };
  });

  const message: ChatPostMessageArguments = {
    channel: "",
    text: `[Yesterday] DAU, First Open App`,
    attachments,
  };

  Slack.postMessage(Properties.slackWebhookUrl, message);
}
