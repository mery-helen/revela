# Parecer de Código — Tarefa 4

**Veredito:** APROVADO

## Escopo inspecionado
- Diff exato: `git diff f05116af09c5ff0c059f7932bdea2dc13aa22803` (3 arquivos: `register-page.html`, `register-page.spec.ts`, `register-page.ts`).
- Testes executados: `npm run test -w apps/web -- --watch=false` em `C:\Users\meryh\revela` — **2 arquivos, 5 testes, todos passando**.
- Referências consultadas: `docs/architecture.md`, `.agents/rules/01-angular-strict-rules.md`, `docs/design-tokens.md`, `specs/3-criar-uma-conta/spec.md` (CA4, CA3), `specs/3-criar-uma-conta/plan.md` (Tarefa 4).

## Conformidade observada
- **CA4 atendido:** teste submete com senha `123456` e confirmação `654321`, verifica mensagem exata `"As senhas não coincidem"` em `[data-testid="error-confirm-password"]` e `expectNone` de requisição HTTP.
- **CA3 preservado:** quando `confirmPassword` está vazio, o validador retorna `null` e o template prioriza `required`, mantendo "Confirmação de senha é obrigatória."
- **Fronteiras respeitadas:** sem `HttpClient`/repository/SDK no componente; sem antecipação de CA1/CA2/CA5/CA6.
- **Angular/arquitetura:** Reactive Forms (`FormGroup`, `FormControl`, `Validators`, `ValidatorFn`), control flow `@if`, `signal()` para estado, sem `any`, sem NgModule, sem decorator I/O, sem CSS de componente, arquivo/classe no estilo conciso. Token `text-status-restriction-text` usado conforme `docs/design-tokens.md`.

## Apontamentos (bloqueiam)
- Nenhum.

## Sugestões (não bloqueiam)
- A divergência de senha é exposta como erro no nível do `FormGroup` (`passwordMismatch`) e tratada por `shouldShowError`; o controle `confirmPassword` permanece válido por si só. Isso não viola CA4/CA3 hoje, mas se código futuro passar a decidir exibição/fluxo apenas por `confirmPassword.invalid`, o mismatch não será percebido. Se esse caso surgir, considerar também refletir o erro no controle de confirmação.

## Observações fora do escopo deste diff
- O teste novo reutiliza `HttpTestingController`/`provideHttpClient`/`provideHttpClientTesting` já presentes no arquivo; não é problema introduzido por esta tarefa, apenas infraestrutura de teste pré-existente no spec.
