import { User } from './user.model';

export interface StoredUser extends User {
  // TODO #26: Substituir armazenamento de senha em texto puro por Supabase Auth.
  password: string;
}
