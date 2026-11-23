---
issue: 4
---

# Plano — US02: Fazer login

## Decisões técnicas

1. **Contrato de autenticação no `AuthRepository`**: novo método `signIn(email, password): Observable<User | null>`. Ele busca `GET /users`, normaliza o e-mail (trim + minúsculas, mesma regra da US01) e compara a senha exatamente como digitada. Usuário não encontrado ou senha divergente resolvem com `null` (caminho triste de credencial, CA2); falhas HTTP continuam propagando como erro (CA4). Assim a `LoginPage` distingue credencial inválida de falha de servidor sem inventar uma classe de erro. // TODO #26: Substituir por Supabase Auth.
2. **Comparação de senha em texto puro no frontend**: conforme Assume que 1 e 3 da spec, a senha do mock é comparada localmente com igualdade estrita, sem trim. // TODO #26: Substituir json-server + comparação local por Supabase Auth.
3. **Sessão e redirecionamento**: reutilizar `AuthSession.setAuthenticatedUser()` (criado na US01) e navegar para `/groups` via `Router`. Sem persistência (fora de escopo).
4. **Validação do formulário**: apenas `required` nos dois campos e `Validators.email` no e-mail — a regra de comprimento mínimo de senha pertence à US01 e está fora de escopo aqui.
5. **Local das mensagens**: "E-mail ou senha inválidos" abaixo do formulário (CA2); "Não foi possível conectar ao servidor. Tente novamente." no topo do formulário, como na `RegisterPage` (CA4). Nenhum dos dois limpa os valores digitados.
6. **Testes**: Vitest com `HttpTestingController`, espelhando o padrão de `register-page.spec.ts`; verificação da casca (CA6) em `app.spec.ts`.

## Tarefas

- [x] **Tarefa 1 — Autenticação no repositório** — Cobre: passo técnico (destrava CA1, CA2, CA4). Teste primeiro: `signIn` encontra o usuário por e-mail case-insensitive e ignorando espaços nas pontas quando a senha é idêntica, retorna `null` quando o e-mail não existe ou a senha diverge, e propaga erro HTTP. Entrega: método `signIn` em `AuthRepository` retornando `Observable<User | null>`.

- [x] **Tarefa 2 — Rota de login na casca** — Cobre: CA6. Teste primeiro: ao navegar para `/login`, a tela de login é renderizada entre o cabeçalho e o rodapé. Entrega: `LoginPage` com `data-page="login"` (já roteada) verificada no `app.spec.ts`.

- [x] **Tarefa 3 — Formulário de login e validações de campo** — Cobre: CA3. Teste primeiro: submeter com campos vazios ou e-mail fora do padrão exibe mensagem de erro sob cada campo inválido e nenhuma requisição é enviada. Entrega: `LoginPage` com formulário reativo (e-mail, senha) e mensagens de erro por campo.

- [x] **Tarefa 4 — Login com sucesso** — Cobre: CA1. Teste primeiro: submeter com e-mail existente (case-insensitive, ignorando espaços nas pontas) e senha correta autentica a pessoa e redireciona para `/groups`. Entrega: integração do formulário com `AuthRepository.signIn`, `AuthSession` e `Router`.

- [x] **Tarefa 5 — Credenciais inválidas** — Cobre: CA2. Teste primeiro: submeter com e-mail inexistente ou senha divergente exibe "E-mail ou senha inválidos" abaixo do formulário, permanece em `/login` e preserva os valores digitados. Entrega: tratamento do retorno `null` do repositório.

- [x] **Tarefa 6 — Erro de servidor** — Cobre: CA4. Teste primeiro: falha do servidor (500/timeout) exibe "Não foi possível conectar ao servidor. Tente novamente." no topo do formulário, preserva os dados digitados, não autentica e reabilita o botão. Entrega: tratamento de erro HTTP no envio do login.

- [ ] **Tarefa 7 — Prevenção de duplo clique** — Cobre: CA5. Teste primeiro: enquanto a requisição está em andamento o botão "Entrar" fica desabilitado e apenas uma requisição é enviada. Entrega: estado de envio no formulário que bloqueia submissões duplicadas.

- [ ] **Tarefa 8 — Link para a tela de cadastro** — Cobre: CA7. Teste primeiro: tocar em "Não tem conta? Criar conta" leva para `/register`. Entrega: link na `LoginPage` apontando para `/register`.

## Critérios sem tarefa

Nenhum.
