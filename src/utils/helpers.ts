export const checkStringValue = (
  value?: string | null,
  transformedValue = value,
  emptyValue = ''
) => (value?.length ? transformedValue : emptyValue);
