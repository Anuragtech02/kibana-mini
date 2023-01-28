FROM python:3.9.16-slim

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./api.py /app/api.py
COPY ./Car_sales.csv /app/Car_sales.csv

EXPOSE 8000

CMD ["uvicorn", "api:app",  "--reload", "--host", "0.0.0.0"]