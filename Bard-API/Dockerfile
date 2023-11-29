# Use the official Python base image
FROM python:3.7-alpine3.18

# Set working directory inside the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the Flask application files to the container
COPY main.py main.py

# Expose the port where the Flask app will run
EXPOSE 5000



RUN printenv | sort

# Command to run the Flask application
CMD ["python", "main.py"]
