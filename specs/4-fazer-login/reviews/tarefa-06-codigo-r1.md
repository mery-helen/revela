# Parecer de Código — Tarefa 6

**Veredito:** APROVADO

## Escopo revisado

- Diff exato (`git diff 24e94f164fbd7e2d2a4fe91df42b314920627760`): altera apenas `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts` (+41 linhas), adicionando o teste de erro de servidor (CA4).
- Insumos lidos: `.agents/agents/revisor-codigo.md`, `docs/architecture.md`, `.agents/rules/01-angular-strict-rules.md`, `.agents/rules/utf-rules.md`, `specs/4-fazer-login/spec.md`, `specs/4-fazer-login/plan.md`.
- Implementação relacionada inspecionada para consistência (não alterada neste diff): `apps/web/src/app/features/auth/pages/login-page/login-page.ts`, `apps/web/src/app/features/auth/pages/login-page/login-page.html`, e referência `register-page.ts/html/spec.ts`.
- Testes executados: `npm test -- --watch=false` — **23 passed (23), 4 arquivos**.
- Lint: `npm run lint` **não pôde ser executado** neste ambiente (chamada `bash` negada pelas permissões da sessão para esse comando). Não há evidência de falha de lint, apenas ausência de execução.

## Avaliação

- **CA4 coberto pelo teste adicionado** (`login-page.spec.ts:140-179`): simula falha 500 no `GET /users`, verifica mensagem exata `"Não foi possível conectar ao servidor. Tente novamente."` no `[data-testid="error-server"]`, preserva valores digitados, confirma `authSession.authenticatedUser()` nulo, ausência de navegação para `/groups` e botão reabilitado (`disabled === false`).
- **Consistência com RegisterPage CA5**: mensagem, `data-testid="error-server"`, posicionamento no topo do formulário (`@if (serverError())` como primeiro elemento dentro do `<form>` em `login-page.html:5-9`, mesmo padrão de `register-page.html:5-9`), preservação de campos e reabilitação do botão estão alinhados.
- **Aderência à arquitetura/regras (implementação exercitada)**: componente não chama `HttpClient` diretamente, usa `AuthRepository`/`AuthSession` injetados via `inject()` (`login-page.ts:14-16,49`); estado local com `signal()` (`login-page.ts:18-21`); Reactive Forms; control flow `@if`; sem `any`; sem `standalone: true`; sem sufixo `Component`; estilos por classes Tailwind/tokens (`text-status-restriction-text`, `bg-primary`, etc.), sem CSS por componente. Sem violação de camada/estrutura identificada.
- **Regressões**: não observadas; suíte de testes passou integralmente.

## Apontamentos (bloqueiam)

Nenhum.

## Sugestões (não bloqueiam)

- `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:140-179` — O teste cobre bem o comportamento de CA4; se quiser torná-lo mais robusto contra regressão de "topo do formulário", poderia assertar a ordem do nó `error-server` em relação ao primeiro campo (ex.: `form.firstElementChild` contém/é o erro). Não bloqueia porque o template atual já coloca o erro no topo e o texto/comportamento exigidos pela spec estão verificados.
- `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts` — Não há `afterEach` com `httpTesting.verify()` neste arquivo (padrão também ausente no `register-page.spec.ts`). Considerar adicionar em refatoração futura para pegar requisições pendentes/inesperadas; não é regressão introduzida por este diff.

## Observações fora do escopo deste diff

- O tratamento de erro HTTP de login (`serverError`, `catch` no subscribe, reset de `isSubmitting`) já está presente em `login-page.ts:20,46,61-64` e `login-page.html:5-9`; não faz parte deste diff. O diff da Tarefa 6 entrega apenas a cobertura de teste descrita no plano.
- Execução de lint não verificada por restrição de permissão da sessão; vale rodar `npm run lint` no ambiente local/CI antes do PR.