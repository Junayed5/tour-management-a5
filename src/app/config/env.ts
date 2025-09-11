import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  MONGODB_URL: string;
  BCRYPT_SALT_ROUNDS: string;
}

const loadEnvVars = (): IEnvConfig => {
  const requireEnv: string[] = ["PORT", "MONGODB_URL", "BCRYPT_SALT_ROUNDS"];

  requireEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing requre ENV ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGODB_URL: process.env.MONGODB_URL as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
  }
};

export const envVars = loadEnvVars();
