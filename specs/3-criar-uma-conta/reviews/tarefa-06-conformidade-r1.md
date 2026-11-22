# Parecer de Conformidade — Tarefa 6

**Veredito:** APONTAMENTOS

## Critérios verificados
| Critério (da spec/plan) | Situação | Onde |
| --- | --- | --- |
| Repositório cria uma conta enviando os dados (destrava CA1) | atendido | `apps/web/src/app/core/data/repositories/auth-repository.ts:19-21`, teste em `apps/web/src/app/core/data/repositories/auth-repository.spec.ts:26-46` |
| Repositório verifica e-mail já cadastrado de forma case-insensitive e ignorando espaços nas pontas (destrava CA2) | atendido | `apps/web/src/app/core/data/repositories/auth-repository.ts:23-32`, testes em `apps/web/src/app/core/data/repositories/auth-repository.spec.ts:48-80` |
| Modelo `User` em `core/data/models` | atendido | `apps/web/src/app/core/data/models/user.model.ts:1-7` |
| `AuthRepository` em `core/data/repositories` | atendido | `apps/web/src/app/core/data/repositories/auth-repository.ts:14-34` |
| `provideHttpClient()` no `app.config` | atendido | `apps/web/src/app/app.config.ts:2,10` |
| Não antecipa UI/sessão/redirecionamento/erro de servidor/loading (tarefas 7-10) | atendido | Diff restrito a modelo, repositório, spec de repositório e configuração de HTTP |
| Testes da tarefa executam com sucesso | atendido | `npm run test -w apps/web -- --watch=false` — 3 arquivos, 9 testes, todos passaram |

## Apontamentos
1. **Interface de tipo definida fora de `core/data/models`** — `apps/web/src/app/core/data/repositories/auth-repository.ts:8-12`
   Critério violado: Regra do projeto `01-angular-strict-rules.md`: "3. ESTRUTURA ... `core/data/models/`: ÚNICO lugar de interfaces e tipos. PROIBIDO criar models dentro de `features/`." A regra estabelece `core/data/models/` como único lugar de interfaces e tipos.
   Evidência: O diff adiciona `export interface CreateAccountPayload { name: string; email: string; password: string; }` em `apps/web/src/app/core/data/repositories/auth-repository.ts`, em vez de declará-la em `core/data/models/`.
