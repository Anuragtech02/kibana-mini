from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Any, Optional
from enum import Enum
import pandas
import datetime
from fastapi.middleware.cors import CORSMiddleware




class FilterTypes(str, Enum):
    not_null = "not_null"
    null = "null"
    text_contains = "text_contains"
    text_not_contains = "text_not_contains"
    text_starts_with = "text_starts_with"
    text_ends_with = "text_ends_with"
    text_equals = "text_equals"
    greater_than = "greater_than"
    greater_than_equal = "greater_than_equal"
    less_than = "less_than"
    less_than_equal = "less_than_equal"
    equal = "equal"
    not_equal = "not_equal"
    date_is = "date_is"
    date_greater_than = "date_greater_than"
    date_less_than = "date_less_than"


class FilterModel(BaseModel):
    cond: FilterTypes
    value: Any
    column: str


class SortModel(BaseModel):
    column: str
    asc: bool

class QueryBody(BaseModel):
    columns: List[str]
    filters: List[FilterModel]
    sort: Optional[SortModel]
    skip: int
    limit: int

class TranscationModel(BaseModel):
    time: float
    record_count: int

class QueryResponse(BaseModel):
    columns: List[str]
    transcation: TranscationModel
    records: List[dict]
    next: bool

app = FastAPI()
origins = [
    
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["OPTIONS", "GET", "POST"],
    allow_headers=["*"],
)
records = [
    {"id": "abc-123", "title": "creation", "type": "documentary", "score": 4.5, "release": datetime.datetime(year=2022, month=12, day=3, hour=3, minute=36)},
    {"id": "abd-153", "title": "toy", "type": "thriller", "score": 3.5, "release": datetime.datetime(year=2022, month=11, day=5, hour=13, minute=36)},
    {"id": "abe-163", "title": "cars", "type": "documentary", "score": 4.6, "release": datetime.datetime(year=2022, month=12, day=13, hour=3, minute=36)},
    {"id": "abf-143", "title": "pixar", "type": "sci-fi", "score": 4.2, "release": datetime.datetime(year=2022, month=12, day=23, hour=23, minute=36)},
    {"id": "abg-133", "title": "beast", "type": "animation", "score": 4.5, "release": datetime.datetime(year=2022, month=10, day=2, hour=3, minute=36)},
    {"id": "abh-173", "title": "avatar", "type": "documentary", "score": 4.5, "release": datetime.datetime(year=2022, month=12, day=3, hour=4, minute=36)}
]

df = pandas.DataFrame(records)


@app.post("/query", response_model=QueryResponse, tags=["API"])
async def query(body: QueryBody):
    start = datetime.datetime.now()

    resultant_df = df

    combined_columns_list = body.columns + [i.column for i in body.filters]
    if body.sort is not None:
        combined_columns_list.append(body.sort.column)

    for i in combined_columns_list:
        if i not in df.columns.values.tolist():
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Invalid column: {i}")  



    for filter in body.filters:
        if filter.cond == FilterTypes.not_null:
            resultant_df = resultant_df[~resultant_df[filter.column].isnull()]
        if filter.cond == FilterTypes.null:
            resultant_df = resultant_df[resultant_df[filter.column].isnull()]

        if filter.cond == FilterTypes.text_contains:
            resultant_df = resultant_df[resultant_df[filter.column].str.contains(filter.value)]
        if filter.cond == FilterTypes.text_not_contains:
            resultant_df = resultant_df[~resultant_df[filter.column].str.contains(filter.value)]
        if filter.cond == FilterTypes.text_starts_with:
            resultant_df = resultant_df[resultant_df[filter.column].str.startswith(filter.value)]
        if filter.cond == FilterTypes.text_ends_with:
            resultant_df = resultant_df[resultant_df[filter.column].str.endswith(filter.value)]
        if filter.cond == FilterTypes.text_equals:
            resultant_df = resultant_df[resultant_df[filter.column] == filter.value]

        if filter.cond == FilterTypes.greater_than:
            resultant_df = resultant_df[resultant_df[filter.column] < filter.value]
        if filter.cond == FilterTypes.greater_than:
            resultant_df = resultant_df[resultant_df[filter.column] <= filter.value]
        if filter.cond == FilterTypes.less_than:
            resultant_df = resultant_df[resultant_df[filter.column] > filter.value]
        if filter.cond == FilterTypes.less_than_equal:
            resultant_df = resultant_df[resultant_df[filter.column] >= filter.value]
        if filter.cond == FilterTypes.equal:
            resultant_df = resultant_df[resultant_df[filter.column] == filter.value]   
        if filter.cond == FilterTypes.not_equal:
            resultant_df = resultant_df[resultant_df[filter.column] != filter.value]  

        if filter.cond == FilterTypes.date_is:
            date_value = datetime.datetime.fromisoformat(filter.value)
            start = datetime.datetime.combine(date_value, datetime.time.min)
            end = datetime.datetime.combine(date_value, datetime.time.max)
            resultant_df = resultant_df[(resultant_df[filter.column] >= start )& (resultant_df[filter.column] <= end)]
        if filter.cond == FilterTypes.date_greater_than:
            resultant_df = resultant_df[resultant_df[filter.column] > filter.value]   
        if filter.cond == FilterTypes.date_less_than:
            resultant_df = resultant_df[resultant_df[filter.column] < filter.value]  


    resultant_df = resultant_df[body.columns]

    if body.sort is not None:
        resultant_df = resultant_df.sort_values(by=[body.sort.column], ascending=body.sort.asc)


    end = datetime.datetime.now()
    delta = end - start
    return QueryResponse(
        columns=resultant_df.columns.values.tolist(),
        transcation=TranscationModel(
            time=delta.microseconds/10**6, record_count=len(resultant_df)
        ),
        records=resultant_df.to_dict(orient="records"),
        next=False
    )


class ColumnList(BaseModel):
    columns: List[str]


@app.get("/columns", tags=['Meta'], response_model=ColumnList)
async def list_columns():
    return {
        "columns": df.columns.values.tolist()
    }