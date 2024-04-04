export interface logUser {
  email: string,
  password: string,
  fio: string
}

export interface LoginResponse {
  token: string;
}

export interface RegistrationResponse {
  token: string;
}

export interface User {
  email: string;
  id: number;
  roles: Roles[];
  iat: number;
  exp: number;
}

interface Roles {
  id: number;
  name: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
  UserRole?: UserRole;
}

interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}
