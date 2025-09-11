export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface Wallet {
    balance?: string;
  };

export interface IUserWallet {
  name: string;
  phone: string;
  password: string;
  role?: Role;
  isActive?: IsActive;
  isVerified ?: boolean  
  wallet?: Wallet
}
