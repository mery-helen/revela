# Parecer de Conformidade — Tarefa 2

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA6 — aberta em `/login`, a tela de login aparece entre o cabeçalho e o rodapé | atendido | `apps/web/src/app/app.spec.ts:43-66` (teste), `apps/web/src/app/app.routes.ts:9-13` (rota), `apps/web/src/app/features/auth/pages/login-page/login-page.html:1` (`data-page="login"`), `apps/web/src/app/app.html:2,9` (header/footer em volta do `router-outlet`) |

## Apontamentos
Nenhum.

---

Detalhamento da verificação (somente leitura, não corrigi nada):

- **Diff confere com o escopo da tarefa.** `git diff b0f6d3f5aed30a9bc336522559cf54f2985ac163` mostra exatamente 1 arquivo alterado, `apps/web/src/app/app.spec.ts`, com +25 linhas e nenhuma remoção — apenas o teste novo. A rota `/login` e o `data-page="login"` já existiam na base (`app.routes.ts:10-12`; `login-page.html:1`), coerente com o "(já roteada)" do texto da tarefa. Nada de escopo inflado.
- **O teste prova o critério, não a si mesmo.** Ele cria o `App` real com `provideRouter(routes)`, navega via `router.navigateByUrl('/login')`, aguarda o `router-outlet`, e verifica: (a) `header` e `footer` existem; (b) `[data-page="login"]` existe — seletor presente só no template da `LoginPage`; (c) via `compareDocumentPosition`, o login vem **depois** do header (`DOCUMENT_POSITION_FOLLOWING`, linha 64) e **antes** do footer (`DOCUMENT_POSITION_PRECEDING`, linha 65). Como `app.html:2` e `app.html:9` colocam header e footer ao redor do `<router-outlet>`, o teste comprova a posição entre cabeçalho e rodapé, e não uma montagem artificial do componente.
- **Testes executados.** `npm test -- --watch=false` → Vitest v5.1.1, 3 arquivos, **19 testes passando**, incluindo o novo caso CA6. Teste que não roda não contaria; rodou e passou.
- **Sem glossário divergente.** `LoginPage` como classe e `login-page.ts` como arquivo batem com `docs/architecture.md:42` e o mapeamento de rota em `docs/architecture.md:375` (`/login` → `LoginPage`).
- **Sem caso de abandono aplicável nesta tarefa.** O abandono da spec (§6) é sobre dados preenchidos; a `LoginPage` desta tarefa ainda é a casca sem formulário (formulário é a Tarefa 3), então não há o que tratar aqui.

Sem sugestões não bloqueantes relevantes ao escopo de conformidade.
