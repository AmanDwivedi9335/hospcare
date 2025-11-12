export type LoginRole = 'staff' | 'superadmin' | 'patient';

export interface LoginDto {
  email: string;
  password: string;
  role: LoginRole;
}
