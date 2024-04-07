export interface logUser {
  email: string,
  password: string,
  fio: string
}

export interface EditUser {
  id: number,
  email: string,
  fio: string
}


export interface EditResponse {
  id: number;
  email: string;
  password: string;
  fio: string;
}

export interface EditBody {
  email: string;
  fio: string;
}

export interface roleResponse {
  name: string;
  userId: number;
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

export interface Roles {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  UserRole?: UserRole;
}
interface UserRole {
  id: number;
  userId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UsFetchData {
  id: number;
  email: string;
  password: string;
  fio: string;
  createdAt: string;
  updatedAt: string;
  roles: Roles[];
}
