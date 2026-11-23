# Parecer de Código — Tarefa 5 (rodada 2)

**Veredito:** APROVADO

## Escopo revisado

- Diff: `git diff f06dcef19f78c5554144fd669860ae7df5c3fcc3` (working tree/index) — `apps/web/src/app/features/auth/pages/login-page/login-page.html`, `login-page.ts`, `login-page.spec.ts` e artefato `specs/4-fazer-login/reviews/tarefa-05-codigo-r1.md`.
- Spec/plano: `specs/4-fazer-login/spec.md` (CA2, `status: aprovada`), `specs/4-fazer-login/plan.md` (Tarefa 5).
- Referências: `docs/architecture.md`, `.agents/rules/01-angular-strict-rules.md`, `.agents/rules/utf-rules.md`.
- Verificação executada: `npm test -- --watch=false` em `C:\Users\meryh\revela` — **22/22 testes passaram** (4 arquivos). `npm run lint` **não executado**: o comando foi negado pela política de permissões do ambiente nesta sessão.

## Correção do apontamento r1

- **Resolvido.** O bloqueante da r1 (conformidade) apontava que a mensagem de credenciais inválidas não estava "abaixo do formulário" (CA2/spec:18, plan:13). No diff, o bloco `@if (invalidCredentials()) { ... data-testid="error-invalid-credentials" ... }` foi movido para fora do `<form>`, ficando após `</form>` (`login-page.html:47-53`) e antes do link de cadastro (`login-page.html:55-57`). O posicionamento agora atende literalmente ao CA2 e à decisão 5 do plano.

## Aderência verificada

- **CA2/Tarefa 5 cobertos**: teste exerce credencial inválida (`GET /users` → `[]`), verifica mensagem exata `"E-mail ou senha inválidos"` em `[data-testid="error-invalid-credentials"]`, ausência de navegação para `/groups`, preservação dos valores digitados e `AuthSession.authenticatedUser()` nulo (`login-page.spec.ts:100-138`).
- **Tratamento do retorno `null`**: ramo `user === null` define `invalidCredentials.set(true)` e `isSubmitting.set(false)` sem navegar nem gravar sessão (`login-page.ts:50-60`); flags de erro são limpas antes do submit (`login-page.ts:45-46`).
- **Arquitetura/camadas**: componente depende apenas de `AuthRepository` e `AuthSession` via `inject()`; sem `HttpClient`/SDK no componente (`login-page.ts:1-6,14-16,49`), alinhado ao `docs/architecture.md` §4.2 e §4.1. Sem import entre features.
- **Padrões Angular/regras do repo**: `signal()`, `inject()`, Reactive Forms, `@if` com novo control flow, sem `any`, sem decorators de input/output, sem `NgModule`, nomes concisos (`LoginPage`, `login-page.ts`), Tailwind por tokens/utilitários sem CSS por componente (`01-angular-strict-rules.md`).
- **Regressões**: suíte existente passou integralmente (22/22), incluindo CA1 e CA3 de login.

## Apontamentos (bloqueiam)

Nenhum.

## Sugestões (não bloqueiam)

1. **Asserção de reabilitação do botão no CA2** — `login-page.spec.ts:100-138`. O teste valida mensagem, permanência e preservação de valores, mas não afirma que `[data-testid="submit-login"]` volta habilitado após o retorno `null`. O código já faz `isSubmitting.set(false)` (`login-page.ts:59`); incluir a asserção tornaria o cenário mais robusto contra regressão de estado de envio, em linha com a expectativa do CA4.
2. **Cobertura explícita de "senha divergente"** — `login-page.spec.ts:100-138`. O CA2 cita "e-mail inexistente ou uma senha que não corresponde à do cadastro"; o teste cobre o caso de e-mail inexistente (`flush([])`). O caminho é o mesmo no repositório, mas um caso nomeado para senha divergente deixaria a evidência mais direta.

## Observações fora do escopo deste diff

- **Lint não comprovado nesta revisão** — `npm run lint` não pôde ser executado por restrição de permissão do ambiente. Recomendo rodar no ambiente local/CI antes do PR.
- **Posicionamento de erro de servidor (CA4, tarefa futura)** — `login-page.html:5-9`. O erro de servidor permanece no topo do formulário, conforme CA4/decisão 5; não faz parte da Tarefa 5, apenas registro de consistência visual já existente.