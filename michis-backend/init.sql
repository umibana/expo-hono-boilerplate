-- This file runs when PostgreSQL container starts for the first time
-- It creates any additional setup needed

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC'; 