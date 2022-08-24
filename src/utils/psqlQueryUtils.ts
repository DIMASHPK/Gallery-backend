import { checkStringValue } from './helpers';

type GetPSQLQueryArgsType = {
  fields?: string;
  from: string;
  limit?: number;
  join?: string;
  groupBy?: string;
  orderBy?: string;
  where?: string;
  offset?: number;
};

export const getPSQLSelectQuery = (data: GetPSQLQueryArgsType) => {
  const {
    limit = null,
    fields = '*',
    from,
    join = null,
    groupBy = null,
    orderBy = null,
    where = null,
    offset = null,
  } = data;

  return `SELECT ${fields} 
    FROM ${from} 
    ${checkStringValue(join)}
    ${checkStringValue(where, `WHERE ${where}`)} 
    ${checkStringValue(groupBy, `GROUP BY ${groupBy}`)}
    ${checkStringValue(orderBy, `ORDER BY ${orderBy}`)}
    ${checkStringValue(offset?.toString?.(), `OFFSET ${offset}`)} 
    ${checkStringValue(limit?.toString?.(), `LIMIT ${limit}`)} 
  `;
};
