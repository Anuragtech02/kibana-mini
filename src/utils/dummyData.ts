export const filtersValues = [
  {
    label: "sort",
    value: "sort",
  },
  {
    label: "not_null",
    value: "not_null",
  },
  {
    label: "null",
    value: "null",
  },
  {
    label: "text_contains",
    value: "text_contains",
  },
  {
    label: "text_not_contains",
    value: "text_not_contains",
  },
  {
    label: "text_starts_with",
    value: "text_starts_with",
  },
  {
    label: "text_ends_with",
    value: "text_ends_with",
  },
  {
    label: "text_equals",
    value: "text_equals",
  },
  {
    label: "greater_than",
    value: "greater_than",
  },
  {
    label: "greater_than_equal",
    value: "greater_than_equal",
  },
  {
    label: "less_than",
    value: "less_than",
  },
  {
    label: "less_than_equal",
    value: "less_than_equal",
  },
  {
    label: "equal",
    value: "equal",
  },
  {
    label: "not_equal",
    value: "not_equal",
  },

  {
    label: "date_is",
    value: "date_is",
  },
  {
    label: "date_greater_than",
    value: "date_greater_than",
  },
  {
    label: "date_less_than",
    value: "date_less_than",
  },
];

export const columnValues = ["id", "title", "type", "score", "release"];
export const columnValuesWithTypes = columnValues.map((column) => ({
  label: column,
  value: column,
}));
export const columnForTable = columnValues.map((column) => ({
  title: column,
  dataIndex: column,
  key: column,
}));
