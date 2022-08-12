type GetPSQLQueryArgsType = {
  fields?: string;
  from: string;
  limit?: number;
};

export const getPSQLSelectQuery = (data: GetPSQLQueryArgsType) => {
  const { limit = null, fields = '*', from } = data;

  return `SELECT ${fields} FROM ${from} ${limit ? `LIMIT ${limit}` : ''} `;
};
