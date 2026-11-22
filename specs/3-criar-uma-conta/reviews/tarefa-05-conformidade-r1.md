# Parecer de Conformidade — Tarefa 5

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA9: Dado que estou na tela de cadastro, quando toco em 'Já tem uma conta? Faça login', então sou levada para a tela de login. | atendido | `apps/web/src/app/features/auth/pages/register-page/register-page.html:76-78`, `apps/web/src/app/features/auth/pages/register-page/register-page.ts:3,18`, `apps/web/src/app/features/auth/pages/register-page/register-page.spec.ts:103-132` |

## Apontamentos

## Evidências consideradas
- Spec/plan lidos: `specs/3-criar-uma-conta/spec.md` (CA9, linha 34; Assume que 4, linha 50; fora de escopo de login real, linha 37/43) e `specs/3-criar-uma-conta/plan.md` (Tarefa 5, linha 24).
- Diff revisado: `git diff 8665c7415f9b58cab1a420a6456c3c6243b77785` (3 arquivos, apenas `register-page.html`, `register-page.spec.ts`, `register-page.ts`).
- Testes executados: `npm run test -w apps/web -- --watch=false` em `C:\Users\meryh\revela` — **2 arquivos de teste, 6 testes, todos passaram**.
- Conformidade observada: o template inclui o link com texto exato `"Já tem uma conta? Faça login"` e `routerLink="/login"`; o componente importa `RouterLink`; o teste localiza o link pelo texto, verifica `href="/login"`, simula clique e confirma navegação para `/login`. Não houve comportamento fora do escopo da tarefa (rota `/login` já prevista como stub pela Tarefa 1/Assume que 4).
