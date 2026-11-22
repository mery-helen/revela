# Parecer de Código — Tarefa 6 (rodada 2)

**Veredito:** APROVADO

## Apontamentos (bloqueiam)

Nenhum.

## Sugestões (não bloqueiam)

- `StoredUser extends User` em `apps/web/src/app/core/data/models/stored-user.model.ts:3` mantém o acoplamento estrutural entre o tipo de persistência mock e o modelo de domínio. Hoje está aceitável porque `User` não expõe `password` e o repositório já faz `toUser()` em `createAccount`; se a borda mock crescer, vale considerar um tipo de armazenamento próprio (ex.: composição) para evitar herança acidental entre contrato de domínio e forma provisória do json-server. // TODO #26

## Observações fora do escopo deste diff

- O diff inclui artefatos de revisão da rodada 1 em `specs/3-criar-uma-conta/reviews/tarefa-06-*-r1.md` e `specs/3-criar-uma-conta/reviews/tarefa-06-decisoes-r1.md`; não são código de aplicação e não foram avaliados como implementação.

## Verificação dos apontamentos da r1

| # | Apontamento r1 | Situação | Evidência |
| --- | --- | --- | --- |
| 1 | `CreateAccountPayload` definido fora de `core/data/models` | **Corrigido** | `apps/web/src/app/core/data/models/create-account-payload.model.ts:1` declara `CreateAccountPayload` em `core/data/models/`; `apps/web/src/app/core/data/repositories/auth-repository.ts:6` importa desse local. |
| 2 | `User` incluía `password`, divergindo do glossário `architecture.md` §5.1 | **Corrigido** | `apps/web/src/app/core/data/models/user.model.ts:1` define `User` apenas com `id, name, email`, alinhado ao §5.1. A senha provisória do mock ficou isolada em `apps/web/src/app/core/data/models/stored-user.model.ts:3` (`StoredUser extends User` + `password`) e em `apps/web/src/app/core/data/models/create-account-payload.model.ts:5`, ambos com `// TODO #26`. O repositório remove a credencial do retorno de criação via `toUser()` em `apps/web/src/app/core/data/repositories/auth-repository.ts:31`. |

## Evidência de verificação

- Diff revisado: `git diff 54ae875b4f598fe0e99a364ccadef96655ef83aa` em `C:\Users\meryh\revela`.
- Insumos lidos: `.agents/agents/revisor-codigo.md`, `docs/architecture.md` (§4.1, §4.2, §4.3, §5.1), `.agents/rules/01-angular-strict-rules.md`, `specs/3-criar-uma-conta/spec.md`, `specs/3-criar-uma-conta/plan.md` (Tarefa 6), `specs/3-criar-uma-conta/reviews/tarefa-06-decisoes-r1.md`.
- Testes executados: `npm run test -w apps/web -- --watch=false` — **3 arquivos de teste, 9 testes, todos passando**. Isso confirma o comportamento coberto pelos testes da tarefa, incluindo criação de conta e verificação case-insensitive/trim de e-mail.
