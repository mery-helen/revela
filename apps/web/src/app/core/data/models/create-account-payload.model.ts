export interface CreateAccountPayload {
  name: string;
  email: string;
  // TODO #26: Substituir armazenamento de senha em texto puro por Supabase Auth.
  password: string;
}
