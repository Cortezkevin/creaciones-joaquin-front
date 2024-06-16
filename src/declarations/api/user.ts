export type UpdateUser = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export type UpdateProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
}