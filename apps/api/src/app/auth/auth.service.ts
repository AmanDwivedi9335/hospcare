import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { LoginDto, LoginRole } from './dto/login.dto';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: LoginRole;
  organization?: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

type RegisterSuperAdminPayload = {
  name: string;
  email: string;
  password: string;
  organization?: string;
};

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
      organization: 'HospCare HQ',
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

  async registerSuperAdmin(payload: RegisterSuperAdminPayload) {
    const { name, email, password, organization } = payload;

    if (!name || !email || !password) {
      throw new BadRequestException('Name, email and password are required');
    }

    const duplicate = this.users.find(
      (candidate) => candidate.email.toLowerCase() === email.toLowerCase(),
    );

    if (duplicate) {
      throw new BadRequestException('An account with this email already exists');
    }

    const newUser: StoredUser = {
      id: this.users.length + 1,
      name,
      email,
      password,
      role: 'superadmin',
      organization,
    };

    this.users.push(newUser);

    const { password: _password, ...safeUser } = newUser;

    return {
      message: 'Super admin registered successfully',
      user: safeUser,
    };
  }
}
