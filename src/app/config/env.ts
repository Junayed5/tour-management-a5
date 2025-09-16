import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  MONGODB_URL: string;
  BCRYPT_SALT_ROUNDS: string;
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  ADMIN_NUMBER: string
  ADMIN_PASSWORD: string
}

const loadEnvVars = (): IEnvConfig => {
  const requireEnv: string[] = ["PORT", "MONGODB_URL", "BCRYPT_SALT_ROUNDS", "JWT_SECRET","JWT_EXPIRES_IN"];

  requireEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing requre ENV ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGODB_URL: process.env.MONGODB_URL as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,    
    ADMIN_NUMBER: process.env.ADMIN_NUMBER as string,    
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,    
  }
};

export const envVars = loadEnvVars();
