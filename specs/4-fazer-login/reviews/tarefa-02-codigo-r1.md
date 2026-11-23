# Parecer de Código — Tarefa 2

**Veredito:** APROVADO

## Apontamentos (bloqueiam)

Nenhum. O diff acrescenta apenas um teste de integração em `apps/web/src/app/app.spec.ts:43-66`, alinhado ao padrão já existente (`app.spec.ts:15-41`), sem `any`, sem arquivo de produção novo, sem violação de camada, e o seletor `[data-page="login"]` é o contrato explicitamente pedido no plano (`LoginPage` com `data-page="login"`).

Verificações executadas:
- `git diff b0f6d3f...` → único arquivo alterado: `apps/web/src/app/app.spec.ts` (staged).
- `npm test -- --watch=false` → 3 arquivos, 19 testes, todos passando (inclui o novo teste e os 19 `it(` mapeados nos specs).
- `LoginPage` (`features/auth/pages/login-page/login-page.ts:1-8`, `login-page.html:1`) e a rota `login` (`app.routes.ts:10-13`) já existiam na base; a entrega desta tarefa é a verificação, como o próprio texto da tarefa antecipa ("já roteada").

## Sugestões (não bloqueiam)

- **Duplicação estrutural entre os dois testes de casca** — `app.spec.ts:43-66` repete quase linha a linha `app.spec.ts:15-41` (fixture, navigate, detectChanges/whenStable, querySelector de header/footer, compareDocumentPosition). Um helper parametrizado (rota + atributo da página) reduziria a manutenção sem perder a asserção de comportamento.
- **Assimetria de asserção em relação ao teste de `/register`** — o teste de `/register` verifica a existência de `<main>` (`app.spec.ts:33-34`); o de `/login` não. Replicar essa verificação deixaria os dois testes com o mesmo contrato de casca.
- **Prova de que a rota controla a renderização** — o teste garante que, em `/login`, a página aparece. Ele não falharia se a `LoginPage` fosse renderizada fora do `router-outlet` (por exemplo, sempre presente ao lado do outlet). Assertar que `[data-page="register"]` está ausente após navegar para `/login` tornaria o teste sensível a esse tipo de regressão. É um endurecimento, não um defeito.
- **`npm run lint` não pôde ser executado** — a restrição de ferramentas deste ambiente libera apenas `git diff/log/status`, `npm test`, `npx vitest/jest`, `ls` e `cat`. Pela leitura do `apps/web/eslint.config.js` (sem regras de formatação, com `eslint-config-prettier`) e do `.prettierrc`, o código adicionado segue o estilo do arquivo (aspas simples, sem `any`, sem imports não usados); ainda assim, a execução do lint precisa ser confirmada por quem tiver a permissão.

## Observações fora do escopo deste diff

- **TDD sem RED nesta tarefa** — como `LoginPage` (com `data-page="login"`) e a rota já existiam na base `b0f6d3f`, o teste novo passa sem qualquer alteração de produção. Isso é coerente com o desenho da tarefa de "casca", mas não demonstra o ciclo RED → GREEN para esta entrega; vale registrar no histórico da tarefa para não parecer que a etapa TDD foi pulada.
- **Seletor por tag `header`/`footer`** — `app.spec.ts:53-54` depende de os componentes `Header`/`Footer` renderizarem, respectivamente, `<header>` e `<footer>` (`header.html:1`, `footer.html:1`). É o mesmo acoplamento do teste de `/register` e corresponde a landmarks semânticos; se um dia a casca trocar a tag, os dois testes quebram juntos. Candidato a padronizar via `data-testid` numa manutenção futura, não uma correção desta tarefa.
