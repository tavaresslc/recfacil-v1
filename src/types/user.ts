export interface User {
  name: string;
  picture: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedin: string;
  portfolio: string;
  chunks: string[];
}

export type FieldName = keyof Omit<User, "picture">;