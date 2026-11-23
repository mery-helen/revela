# Parecer de Código — Tarefa 1

**Veredito:** APROVADO

**Escopo verificado:** diff de `da34a0d` (2 arquivos, +94/−1), `docs/architecture.md`, `01-angular-strict-rules.md`, `utf-rules.md`, `spec.md` e `plan.md`. Testes executados: `npm test -- --watch=false` → 3 arquivos, **18 testes passando** (os 4 novos de `signIn` incluídos).

## Apontamentos (bloqueiam)

Nenhum.

Os pontos centrais do despacho estão aderentes:
- **Camada:** `signIn` foi implementado em `AuthRepository` (`apps/web/src/app/core/data/repositories/auth-repository.ts:28-42`), único ponto de acesso a dados, usando `HttpClient` só ali — sem componente tocando HTTP.
- **Modelos:** nenhum model criado em `features/`; reutiliza `StoredUser`/`User` de `core/data/models/` e delega a conversão ao `toUser` já existente.
- **Tipagem estrita:** assinatura `signIn(email: string, password: string): Observable<User | null>`; nenhum `any` no diff. O retorno descarta `password` (`auth-repository.ts:39,48-54`), coerente com o Glossário (§5.1: `User` = `id`, `name`, `email`).
- **Contrato/erro:** busca `GET /users`, normaliza e-mail com o mesmo `normalizeEmail` da US01, resolve `null` para credencial inválida e **propaga erro HTTP** (não engole falha) — exatamente CA2/CA4 e o plano (decisão 1).
- **Padrão do arquivo:** mesmo estilo de `isEmailRegistered` (declaração `const normalizedEmail`, `http.get<StoredUser[]>` + `pipe(map(...))`), sem abstração nova para um caso só.
- **TDD:** testes adicionados antes/ junto cobrem os três comportamentos exigidos pela tarefa (match case-insensitive com trim, `null` para e-mail inexistente, `null` para senha divergente) mais a propagação de erro 500 (`auth-repository.spec.ts:86-161`). Assertivas checam comportamento/contrato (método GET, `User` sem `password`, `HttpErrorResponse.status`), não detalhe interno.
- **Sem segredo/URL fixa:** usa `environment.apiUrl` (`auth-repository.ts:14`).

## Sugestões (não bloqueiam)

- **Rastreabilidade do TODO #26 no método.** O `// TODO #26` existe no topo do arquivo (`auth-repository.ts:1`), mas a spec (Assume que 1) e o plano (decisão 1) pedem o TODO junto da comparação de senha em texto puro, que é introduzida aqui (`auth-repository.ts:36`). Sem prejuízo funcional, apenas facilita achar o débito na migração da #26.
- **Leve duplicação de leitura.** `isEmailRegistered` (`auth-repository.ts:20-26`) e `signIn` (`auth-repository.ts:28-42`) repetem o padrão “GET /users + normalizar + localizar”. Um privado `findByEmail(users, email)` reduziria a repetição sem criar indireção artificial. Opcional.
- **Cobertura adicional (opcional).** Não há teste com e-mail armazenado em caixa alta/espaços (só o e-mail de entrada é “sujo”). A normalização é simétrica, então é baixo risco; um caso extra blindaria a regra contra regressão.

## Observações fora do escopo deste diff

- `npm run lint` **não pôde ser executado**: a política de permissões desta sessão só libera `git diff/log/status`, `ls`, `cat`, `npm test*`, `npm run test*`, `npx vitest*` e `npx jest*`. Não há evidência de lint no parecer; vale rodar fora do revisor ou liberar o comando. Inspeção manual do diff não achou imports/variáveis não usados nem `any`.
- Débito já rastreado e pré-existente, não introduzido pelo diff: autenticação simulada sobre json-server, senha em texto puro e `GET /users` — cobertos pelo TODO #26 (`auth-repository.ts:1`, `stored-user.model.ts:4`).
