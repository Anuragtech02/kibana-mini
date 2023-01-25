## Backend for kibana-mini

### Quick run

```
cd kibana-mini/backend/

docker build -t kibana-mini-backend:1.0 .

docker run -it -p 8000:8000 kibana-mini-backend:1.0
```

### Usage

Go to `http://localhost:8000/docs`

Try out the `/query` endpoint with this body

```
{
  "columns": [
    "id"
  ],
  "filters": [
    {
      "cond": "not_null",
      "value": "",
      "column": "id"
    }
  ],
  "sort": {
    "column": "id",
    "asc": true
  },
  "skip": 0,
  "limit": 0
}
```

and notice the response, change the input to play around