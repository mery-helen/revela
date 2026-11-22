# Decisões — Tarefa 1, rodada 1

| # | Apontamento (resumo) | Parecer | Decisão | Justificativa |
| --- | --- | --- | --- | --- |
| 1 | Teste da tarefa não foi executado — CA7 não comprovado | conformidade | aceito | Usuário executou `npm install` e `npm test` na raiz; o teste "should render register page between header and footer when navigating to /register" falhou em `src/app/app.spec.ts:26` com `expect(header).toBeTruthy()` / `AssertionError: expected null to be truthy`. Header não encontrado no DOM renderizado; CA7 não comprovado. |
| 2 | Teste da Tarefa 1 não pôde ser executado no ambiente atual (comando obrigatório não rodou) | código | aceito | Mesma evidência do item 1: teste agora executa, mas falha; é necessário corrigir para comprovar CA7 no ambiente padrão. |

## Evidência adicional (fornecida pelo usuário)

- Comandos executados: `npm install` e `npm test` na raiz.
- Falha: `src/app/app.spec.ts:26`, `expect(header).toBeTruthy()` — `AssertionError: expected null to be truthy`.
- Hipótese relatada: `RouterTestingHarness` renderiza só a rota, sem a casca do `App`, ou o teste não monta o `App`.

## Sugestões não promovidas

- Cobertura mínima futura para stubs `/login` e `/groups` (código) — não promovida.
- Semântica do shell (`section` envolvendo `router-outlet`) — não promovida.
