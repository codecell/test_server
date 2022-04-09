export interface UserFace {
  id?: number;
  email: string;
  fullname: string;
  role: Role;
}

enum Role {
  User, Admin
}