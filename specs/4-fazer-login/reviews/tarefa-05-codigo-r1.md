# Parecer de Código — Tarefa 5

**Veredito:** APROVADO

## Escopo revisado

- Diff: `git diff f06dcef19f78c5554144fd669860ae7df5c3fcc3` (working tree/index), arquivos `apps/web/src/app/features/auth/pages/login-page/login-page.ts` e `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts`.
- Spec/plano: `specs/4-fazer-login/spec.md` (CA2), `specs/4-fazer-login/plan.md` (Tarefa 5).
- Referências: `docs/architecture.md`, `.agents/rules/01-angular-strict-rules.md`, `.agents/rules/utf-rules.md`.
- Verificação executada: `npm test -- --watch=false` em `apps/web` — **22/22 testes passaram**. `npm run lint` **não foi executado**: o comando foi negado pela política de permissões do ambiente nesta sessão.

## Aderência verificada

- **CA2 coberto pelo teste**: o caso adiciona cenário de credencial inválida (`GET /users` → `[]`), verifica mensagem exata `"E-mail ou senha inválidos"` em `[data-testid="error-invalid-credentials"]`, permanência fora de `/groups`, preservação dos valores digitados e ausência de usuário autenticado em `AuthSession` (`login-page.spec.ts:100-138`).
- **Tratamento do retorno `null`**: `invalidCredentials.set(true)` e `isSubmitting.set(false)` no ramo `null` (`login-page.ts:58-59`), com limpeza prévia de `invalidCredentials/serverError` no início do submit (`login-page.ts:45-46`). Não há navegação nem gravação de sessão nesse ramo.
- **Arquitetura/camadas**: componente usa apenas `AuthRepository` e `AuthSession` via `inject()`; sem `HttpClient`/SDK no componente (`login-page.ts:14-16,49`). `AuthRepository.signIn` retorna `Observable<User | null>` e encapsula acesso HTTP (`auth-repository.ts:28-42`), conforme `docs/architecture.md` §4.2.
- **Padrões Angular/repo**: `signal()`, `inject()`, Reactive Forms, `@if`, sem `any`, sem decorator de input/output, sem `NgModule`, nomes concisos (`LoginPage`, `login-page.ts`), tipagem estrita nos seletores do teste. Consistente com o padrão de `RegisterPage`.

## Apontamentos bloqueantes

Nenhum.

## Sugestões (não bloqueiam)

1. **Asserção de reabilitação do botão no CA2** — `login-page.spec.ts:100-138`. O teste cobre a mensagem, permanência na rota e preservação dos valores, mas não afirma que `submit-login` volta a ficar habilitado após o retorno `null`. O código já faz `isSubmitting.set(false)` (`login-page.ts:59`), e CA4 exige explicitamente botão reabilitado; incluir essa asserção no CA2 tornaria o teste mais robusto contra regressões de estado de envio.
2. **Consistência de contrato do teste com `HttpTestingController`** — `login-page.spec.ts:122-124`. O teste faz `expectOne` por URL. É funcional, mas menos específico que o padrão usado em `register-page.spec.ts:209-211,373-375`, que também distingue método/forma da requisição em cenários sensíveis. Não é defeito aqui, pois só há uma requisição esperada.

## Observações fora do escopo deste diff

- **Posição da mensagem de credenciais inválidas** — `login-page.html:11-15`. A CA2 e a decisão 5 do plano dizem "abaixo do formulário"; o template atual renderiza `[data-testid="error-invalid-credentials"]` dentro do `<form>`, antes dos campos (região de topo), enquanto CA4 pede erro de servidor no topo. Não foi alterado por este diff, mas vale confirmar na tarefa de UI/CA4 se o posicionamento final atende literalmente à spec.
- **Lint não comprovado nesta revisão** — `npm run lint` não pôde ser executado por restrição de permissão do ambiente. Recomendo rodar no ambiente local/CI antes do PR.