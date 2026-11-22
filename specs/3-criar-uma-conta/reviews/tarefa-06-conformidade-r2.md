# Parecer de Conformidade — Tarefa 6 (rodada 2)

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec/plan) | Situação | Onde |
| --- | --- | --- |
| Teste primeiro: repositório cria uma conta enviando os dados (destrava CA1) | atendido | `apps/web/src/app/core/data/repositories/auth-repository.spec.ts:28-48`, `apps/web/src/app/core/data/repositories/auth-repository.ts:15-17` |
| Teste primeiro: repositório verifica e-mail já cadastrado de forma case-insensitive e ignorando espaços nas pontas (destrava CA2) | atendido | `apps/web/src/app/core/data/repositories/auth-repository.spec.ts:50-84`, `apps/web/src/app/core/data/repositories/auth-repository.ts:19-29` |
| Entrega: modelo `User` em `core/data/models` | atendido | `apps/web/src/app/core/data/models/user.model.ts:1-5` |
| Entrega: `AuthRepository` em `core/data/repositories` | atendido | `apps/web/src/app/core/data/repositories/auth-repository.ts:10-38` |
| Entrega: `provideHttpClient()` no `app.config` | atendido | `apps/web/src/app/app.config.ts:2,10` |
| Escopo: não antecipa UI/sessão/redirecionamento/erro de servidor/loading (tarefas 7-10) | atendido | Diff restrito a `app.config.ts`, modelos em `core/data/models`, repositório e spec de repositório; sem alterações em features/UI |

## Apontamentos r1
- **Apontamento 1 (aceito, r1):** `CreateAccountPayload` fora de `core/data/models` — **corrigido**. Interface movida para `apps/web/src/app/core/data/models/create-account-payload.model.ts:1-6` e importada pelo repositório em `apps/web/src/app/core/data/repositories/auth-repository.ts:6`.
- **Apontamento 2 (aceito, r1):** `User` com `password`, divergindo do glossário §5.1 — **corrigido**. `User` agora contém apenas `id, name, email` (`apps/web/src/app/core/data/models/user.model.ts:1-5`), alinhado ao `docs/architecture.md` §5.1; a senha provisória do mock ficou isolada em `StoredUser` (`apps/web/src/app/core/data/models/stored-user.model.ts:1-6`) e em `CreateAccountPayload`, ambos em `core/data/models/`, com `// TODO #26`. O repositório mapeia `StoredUser` para `User` sem expor `password` (`apps/web/src/app/core/data/repositories/auth-repository.ts:31-37`).

## Apontamentos
Nenhum.

## Evidência
- Diff revisado: `git diff 54ae875b4f598fe0e99a364ccadef96655ef83aa` (escopo da Tarefa 6).
- Testes executados em `C:\Users\meryh\revela`: `npm run test -w apps/web -- --watch=false` — **3 arquivos de teste, 9 testes, todos passando**.
