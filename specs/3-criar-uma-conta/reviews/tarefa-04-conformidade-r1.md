# Parecer de Conformidade — Tarefa 4

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA4: senha e confirmação diferentes ao submeter exibem "As senhas não coincidem" abaixo do campo de confirmação (`spec.md:22`) | atendido | `apps/web/src/app/features/auth/pages/register-page/register-page.ts:4-13,42,54-56`; `apps/web/src/app/features/auth/pages/register-page/register-page.html:56-64`; teste `apps/web/src/app/features/auth/pages/register-page/register-page.spec.ts:66-100` |
| CA3 (fronteira): campos inválidos/vazios continuam exibindo erro sob cada campo inválido, confirmação vazia continua obrigatória e nenhuma requisição é enviada (`spec.md:20`) | atendido | Validador retorna `null` quando confirmação vazia (`register-page.ts:8-10`), `required` mantido no controle (`register-page.ts:37-40`), teste CA3 existente passou (`register-page.spec.ts:15-64`) |

## Apontamentos

## Evidências
- Diff inspecionado: `git diff f05116af09c5ff0c059f7932bdea2dc13aa22803` (3 arquivos: `register-page.ts`, `register-page.html`, `register-page.spec.ts`).
- Testes executados: `npm run test -w apps/web -- --watch=false` — **2 arquivos, 5 testes, todos passando**.
- Escopo: nenhuma implementação antecipada de CA1/CA2/CA5/CA6 observada no diff (sem integração com repositório/auth, sem redirecionamento, sem tratamento de erro de servidor, sem estado de envio/duplo clique).
