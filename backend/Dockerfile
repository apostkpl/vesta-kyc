FROM python:3.14-slim

WORKDIR /app

# Install uv directly into the container
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy dependency files and install them globally in the container
COPY pyproject.toml uv.lock ./
RUN uv pip install --system -r pyproject.toml

# Copy the rest of the application code into the container
COPY . .

EXPOSE 8020