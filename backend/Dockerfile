FROM python:3.13-slim-bookworm

# Set the working directory inside the container for the backend
WORKDIR /app/backend

# Copy the entire backend folder (including pyproject.toml, etc.)
COPY backend/ .

# Upgrade pip and install required tools and dependencies
RUN pip install --upgrade pip && \
    pip install uv uvicorn fastapi && \
    uv sync --project .

# Expose port 8000 for the backend application
EXPOSE 8000

# Run the application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
