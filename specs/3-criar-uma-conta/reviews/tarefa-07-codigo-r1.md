# Parecer de Código — Tarefa 7

**Veredito:** APROVADO

## Apontamentos (bloqueiam)
Nenhum.

## Sugestões (não bloqueiam)
- **`apps/web/src/app/features/auth/pages/register-page/register-page.ts:60-63` — Assinatura sem tratamento de erro no fluxo de submissão.** O `subscribe` cobre apenas o caminho de sucesso, que é suficiente para o CA1/Tarefa 7. Como CA5/Tarefa 9 está explicitamente fora de escopo, isso não bloqueia agora; ao implementar a Tarefa 9, vale trocar por tratamento explícito de erro (e coordenar com o estado de envio da Tarefa 10) para evitar callback solto e deixar o fluxo de falha claro.
- **`apps/web/src/app/core/services/auth-session.ts` — Sessão autenticada apenas em memória.** O uso de `signal` em `core/services` está alinhado à arquitetura (`docs/architecture.md`, §3/§4.1: serviço de infraestrutura/estado global). Como o estado não é persistido, um refresh perderá a autenticação; isso é aceitável no recorte atual/mock, mas merece ser revisitado quando a autenticação real entrar (Entrega 3 / TODO #26).

## Observações fora do escopo deste diff
- A rota `/groups` está mapeada no `docs/architecture.md` (§6) com `authGuard`, mas a proteção de rota/autenticação real não faz parte deste diff nem do escopo da Tarefa 7. Verificar quando as tarefas/US de guarda de rota forem implementadas.
- Limitação provisória já conhecida: autenticação/sessão são mockadas no frontend e dados vêm do `json-server`; substituição pelo Supabase/Auth real permanece rastreada por TODO #26 e pela Entrega 3 (`docs/architecture.md`, §2.1/§7).

## Evidências consideradas
- Diff inspecionado: `git diff e7b7e8e1b37330368819142c97f29f744c6389cb` (3 arquivos: `apps/web/src/app/core/services/auth-session.ts`, `apps/web/src/app/features/auth/pages/register-page/register-page.spec.ts`, `apps/web/src/app/features/auth/pages/register-page/register-page.ts`).
- Testes executados: `npm run test -w apps/web -- --watch=false` — **3 arquivos, 10 testes, todos passaram**.
- Conformidade verificada no diff: componente não chama `HttpClient` diretamente e usa `AuthRepository` (`docs/architecture.md`, §4.2; `.agents/rules/01-angular-strict-rules.md`); sessão global fica em `core/services` com `signal`; sem `localStorage` no componente; sem antecipação visível de CA2/CA5/CA6/T8-T10; uso de `inject()`, Reactive Forms e padrões Angular do projeto preservados.
