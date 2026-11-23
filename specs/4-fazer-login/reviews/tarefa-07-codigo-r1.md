# Parecer de Código — Tarefa 7

**Veredito:** APROVADO

## Escopo revisado

- Diff executado: `git diff 949214c9ae417188e8720bee8f28a6495b8320b0` em `C:\Users\meryh\revela` (working tree/index).
- Arquivo alterado no diff: `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts`.
- Insumos lidos: `.agents/agents/revisor-codigo.md`, `specs/4-fazer-login/spec.md` (CA5), `specs/4-fazer-login/plan.md` (Tarefa 7), `docs/architecture.md`, `.agents/rules/01-angular-strict-rules.md`, `.agents/rules/utf-rules.md`.
- Contexto de consistência verificado (leitura, fora do diff): `login-page.ts`, `login-page.html`, `register-page.ts`, `register-page.html`.
- Testes executados: `npm test -- --watch=false` — **24 testes passaram, 4 arquivos**.
- Lint: `npm run lint` **não executado** — o comando foi bloqueado pelas permissões de ferramenta do ambiente de revisão; sem evidência de lint nesta passada.

## Avaliação

- **CA5/Tarefa 7 cobertos pelo diff:** o teste adicionado preenche credenciais válidas, dispara o submit, verifica `[disabled]="isSubmitting()"` durante a requisição pendente, tenta um segundo clique e afirma exatamente uma requisição com `httpTesting.match(...).length === 1`, finalizando com `flush` e `expectNone` (`apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:181-214`). Evidência alinhada ao texto literal da Tarefa 7.
- **Aderência à arquitetura/regras:** o teste usa `TestBed`, `HttpTestingController` e `environment.apiUrl`, sem `HttpClient` direto no componente, sem `any`, sem padrões proibidos pelas regras Angular do repo. A implementação exercitada (`login-page.ts:21,35-47,54,59,63`; `login-page.html:42`) mantém o padrão de `signal()` + guarda `isSubmitting()` já usado em `RegisterPage` (`register-page.ts:32,57,69,75,83,87,93`), consistente com CA6/CA4 e com a arquitetura feature-driven.
- **Regressão aparente:** não identificada no escopo do diff; suíte de testes passou integralmente.

## Apontamentos (bloqueiam)

Nenhum.

## Sugestões (não bloqueiam)

- **Robustez do teste em jsdom:** o teste clica em um botão já `disabled` para provar a ausência de segunda requisição (`login-page.spec.ts:203-208`). Em DOM real, botão desabilitado não dispara clique; em jsdom o comportamento pode variar. Como a proteção real também depende da guarda `if (this.isSubmitting()) return;` (`login-page.ts:35-37`), o teste já está adequado para CA5, mas poderia ficar mais explícito chamando `component.onSubmit()`/acionando o submit do form como segunda tentativa defensiva. Não bloqueia porque a asserção observável de CA5 (uma requisição) está presente.
- **Lint não evidenciado:** executar `npm run lint` no ambiente com permissão adequada para fechar a verificação de qualidade estática desta tarefa.

## Observações fora do escopo deste diff

- Nenhuma candidata a Issue de manutenção identificada no diff revisado.