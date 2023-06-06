# emerginet/backend2   latest    e8521e1731aa   10 minutes ago   926MB

FROM python:3.10
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "./app.py"]

# emerginet/backend3   latest    134f42cfcc27   20 seconds ago   440MB 

FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential default-libmysqlclient-dev

COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
EXPOSE 5000
CMD ["python", "./app.py"]
