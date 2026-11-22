# Parecer de Conformidade — Tarefa 1

**Veredito:** APONTAMENTOS

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA7 — Dado que a aplicação é aberta em /register, quando acesso a tela, então a tela de cadastro aparece entre o cabeçalho e o rodapé. | não atendido (implementação presente; teste não executado) | `apps/web/src/app/app.html`, `apps/web/src/app/app.spec.ts`, `apps/web/src/app/shared/components/header/header.*`, `apps/web/src/app/shared/components/footer/footer.*`, `apps/web/src/app/features/auth/pages/register-page/register-page.*`, `apps/web/src/app/app.routes.ts` |

## Apontamentos
1. **Teste da tarefa não foi executado — critério não comprovado** — `apps/web/src/app/app.spec.ts`
   Critério violado: `specs/3-criar-uma-conta/spec.md:28` — "Dado que a aplicação é aberta em /register, quando acesso a tela, então a tela de cadastro aparece entre o cabeçalho e o rodapé."
   Evidência: O teste `should render register page between header and footer when navigating to /register` foi adicionado e, no diff, navega para `/register` via `RouterTestingHarness.create('/register')`, verifica presença de `header`, `footer` e `[data-page="register"]`, e valida a posição relativa com `compareDocumentPosition`. Porém, ao rodar `npm test -- --run` em `C:\Users\meryh\revela\apps\web`, a execução falhou antes dos testes por ambiente: `Node packages may not be installed. Try installing with 'npm install'` / `Could not find the '@angular/build:unit-test' builder's node package.` (`node_modules` ausente no ambiente atual). Conforme método, teste que não roda não conta como critério atendido.

## Observações de escopo/inspeção
- Escopo da tarefa respeitado no diff: shell com cabeçalho/área central/rodapé (`app.html`), rota `/register` com lazy load de `RegisterPage` e stubs de `/login` e `/groups` (`app.routes.ts`), conforme solicitado.
- Não foram identificados comportamentos extras fora do CA7/Tarefa 1 no diff inspecionado.
- Limitação da verificação: não foi possível confirmar execução dos testes por ausência de dependências instaladas no ambiente.
