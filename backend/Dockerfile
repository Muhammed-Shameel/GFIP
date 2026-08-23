FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY app ./app
# Explicitly copy sample data
COPY GFIP_Phase1_Sample_Data_and_Test_Scenarios/GFIP_Phase1_Sample_Data_and_Test_Scenarios /app/data/sample_data
EXPOSE 8000
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8000"]
