import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { LoginDto, LoginRole } from './dto/login.dto';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: LoginRole;
}

interface StoredUser extends AuthUser {
  password: string;
}

@Injectable()
export class AuthService {
  private readonly users: StoredUser[] = [
    {
      id: 1,
      name: 'Sandra Scott',
      email: 'sandra.staff@hospcare.local',
      role: 'staff',
      password: 'staff1234',
    },
    {
      id: 2,
      name: 'Lauren Patel',
      email: 'lauren.super@hospcare.local',
      role: 'superadmin',
      password: 'supersecure',
    },
    {
      id: 3,
      name: 'Michael Anderson',
      email: 'michael.patient@hospcare.local',
      role: 'patient',
      password: 'patientpass',
    },
  ];

  async login(credentials: LoginDto) {
    const { email, password, role } = credentials;

    if (!email || !password || !role) {
      throw new BadRequestException('Email, password and role are required');
    }

    const user = this.users.find(
      (candidate) =>
        candidate.role === role &&
        candidate.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _password, ...safeUser } = user;

    return {
      token: `fake-token-${user.role}-${user.id}`,
      user: safeUser,
    };
  }
}
