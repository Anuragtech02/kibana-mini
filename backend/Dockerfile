FROM python:3.9.16-slim

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./api.py /app/api.py

EXPOSE 8000

CMD ["uvicorn", "api:app",  "--reload", "--host", "0.0.0.0"]