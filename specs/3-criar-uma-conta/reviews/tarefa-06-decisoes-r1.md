# Decisões — Tarefa 6, rodada 1

| # | Apontamento (resumo) | Parecer | Decisão | Justificativa |
| --- | --- | --- | --- | --- |
| 1 | `CreateAccountPayload` definido fora de `core/data/models` | conformidade/código | aceito | a regra do projeto define core/data/models/ como único lugar de interfaces e tipos; o CreateAccountPayload deve ser movido para lá. |
| 2 | `User` inclui `password` no modelo de domínio, divergindo do glossário | código | aceito | o architecture.md §5.1 define User como id, name, email. A senha em texto puro é provisória (Assume 1, #26) e deve ficar isolada em um tipo próprio de cadastro/mock em core/data/models/, mantendo o // TODO #26, sem espalhar password pelo modelo User compartilhado. |

## Sugestões não promovidas
- Cobrir normalização simétrica no `createAccount` (teste/contrato) — código. Não promovida; normalização do e-mail na criação será tratada nas tarefas 7 e 8.
