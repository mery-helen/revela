# Parecer de Código — Tarefa 8

**Veredito:** APROVADO

## Escopo revisado

- **Spec/Plano/Tarefa:** `specs/4-fazer-login/spec.md` (CA7), `specs/4-fazer-login/plan.md` (Tarefa 8 — "Link para a tela de cadastro", cobre CA7).
- **Diff:** `git diff be31a4608d0bc38faf8d20df6f45925130f4e04b` (working tree/index) — único arquivo alterado: `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts`.
- **Implementação relacionada verificada no working tree:** `apps/web/src/app/features/auth/pages/login-page/login-page.ts`, `apps/web/src/app/features/auth/pages/login-page/login-page.html` (já presentes no estado atual; não aparecem no diff contra `be31a4608d0bc38faf8d20df6f45925130f4e04b`).
- **Testes executados:** `npm test -- --watch=false` — **25 passed / 4 files passed**.
- **Lint:** `npm run lint` não executado por restrição de permissão do shell no ambiente; não houve evidência de violação nas regras inspecionadas manualmente.

## Avaliação

- **Aderência à arquitetura/padrões:** Sem violação identificada. `LoginPage` é standalone, usa `inject()`, `signal()`, Reactive Forms, `RouterLink` declarativo e não acessa `HttpClient`/SDK diretamente (`login-page.ts:1-16`, `login-page.html:56`). Sem `any`, sem NgModule, sem estilos por componente, sem valores visuais soltos fora de tokens.
- **Consistência com RegisterPage (CA9/reverso):** O link de login→cadastro é consistente com o link inverso de cadastro→login em estrutura, estilo e uso de `RouterLink` (`login-page.html:55-57` vs `register-page.html:88-90`).
- **Cobertura CA7:** O teste adicionado cobre o critério de aceite: localiza o âncora com texto exato `"Não tem conta? Criar conta"`, verifica `href="/register"`, simula clique e confirma navegação para `/register` (`login-page.spec.ts:220-249`).
- **Regressão:** Sem risco aparente; alteração é aditiva em teste, e suíte passou integralmente.

## Apontamentos (bloqueiam)

Nenhum.

## Sugestões (não bloqueiam)

- O teste de CA7 repete o padrão de `TestBed.resetTestingModule()` + reconfiguração local já existente no arquivo. Não é problema para esta tarefa, mas, se o arquivo continuar crescendo, vale considerar um helper de setup para reduzir custo/duplicação de configuração de testes.

## Observações fora do escopo deste diff

- O `plan.md` ainda marca a Tarefa 8 como `[ ]` (`specs/4-fazer-login/plan.md:32`), embora a entrega funcional (link em `login-page.html:56` com `RouterLink` em `login-page.ts:3,10`) já esteja presente no working tree. Não é defeito de código; apenas estado documental a confirmar no fluxo de encerramento da tarefa.