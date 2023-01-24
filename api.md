## API


POST /query

Body
```
{
    columns: [col1, col2 . . . .],
    filters: [
        {
            cond: "not_null",
            value: "",
            column: col1
        }
    ],
    sort: {
        column: col1,
        direction: 1
    },
    skip: 0,
    limit: 100
}
```

Possible values
```
filters.cond => (not_null, null, text_contains, text_not_contains, text_starts_with, text_ends_with, text_equals, greater_than, greater_than_equal, less_than, less_than_equal, equal, not_equal, is_between, date_is, date_greater_than, date_less_than)

sort.direction => (1, -1)
```

Response
```
{
    "columns": [col1, col2 . . . ],
    "transcation": {
        "time": 300,
        "record_count": 1200
    },
    "records: [
        {
            "col1": "record1",
            "col2": "record2",
            "col3": "record3"
        },
        . . . 
    ],
    "next": true/false
}
```

