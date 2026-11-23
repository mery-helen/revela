# Parecer de Conformidade — Tarefa 1

**Veredito:** APROVADO

## Critérios verificados

| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| Busca de usuário por e-mail (GET /users) — Assume que 3 | atendido | `apps/web/src/app/core/data/repositories/auth-repository.ts:31` |
| E-mail comparado case-insensitive e ignorando espaços nas pontas (CA1) | atendido | `auth-repository.ts:29,35,44-46`; teste `auth-repository.spec.ts:86-103` |
| Senha idêntica à armazenada (comparação estrita, sem trim — plano item 2) | atendido | `auth-repository.ts:36`; teste `auth-repository.spec.ts:86-103` |
| Retorna `null` quando o e-mail não existe (CA2) | atendido | `auth-repository.ts:39`; teste `auth-repository.spec.ts:105-121` |
| Retorna `null` quando a senha diverge (CA2) | atendido | `auth-repository.ts:33-39`; teste `auth-repository.spec.ts:123-139` |
| Propaga erro HTTP (CA4) | atendido | `auth-repository.ts:31-41` (sem `catchError`); teste `auth-repository.spec.ts:141-161` |
| Entrega: `signIn` em `AuthRepository` retornando `Observable<User | null>` | atendido | `auth-repository.ts:28` |
| Retorno é `User` sem vazar `password` | atendido (coerente com `createAccount`) | `auth-repository.ts:39,48-54`; teste `auth-repository.spec.ts:101-102` |
| Autenticar/redirecionar para `/groups` (CA1, parcela de UI) | fora desta tarefa | Tarefa 4 do plano |
| Mensagens, preservação de campos, reabilitação do botão (CA2/CA4, parcela de UI) | fora desta tarefa | Tarefas 5 e 6 do plano |

## Provas executadas

- `git diff da34a0d843a38c12c83858b04373c0a29fd7e958`: apenas `auth-repository.ts` e `auth-repository.spec.ts` são tocados — nenhum arquivo extra, nenhum modelo novo, nenhuma rota/tela alterada. Escopo contido no da Tarefa 1.
- `npm test -- --watch=false` (raiz → `ng test` em `apps/web`): **3 arquivos, 18 testes, todos passando**.
- Os quatro comportamentos exigidos pelo texto da tarefa têm teste dedicado e com asserção efetiva (não há mock testando mock: o `HttpTestingController.expectOne` garante uma única requisição GET a `${environment.apiUrl}/users`, e `request.flush` injeta a resposta real do fluxo).
- Isolamento das causas: o teste de "e-mail inexistente" mantém a senha correta (`'123456'`) e o de "senha divergente" mantém o e-mail existente — cada teste falha pela causa que diz cobrir.

## Apontamentos

Nenhum.

## Sugestões não bloqueantes

1. O teste de erro cobre apenas HTTP 500, não timeout (`auth-repository.spec.ts:156`). O texto da Tarefa 1 pede apenas "propaga erro HTTP"; o caso de timeout pertence ao tratamento de erro na UI (Tarefa 6 / CA4). Se quiser antecipar cobertura, um segundo caso com `request.error(new ProgressEvent('timeout'))` fecharia a lacuna sem mudar contrato.
2. Não há teste afirmando explicitamente que a senha **não** é normalizada (ex.: `' 123456 '` deve divergir de `'123456'`). É comportamento derivado do plano (item 2, comparação estrita) e está correto no código (`auth-repository.ts:36`); um teste de borda documentaria a intenção.
