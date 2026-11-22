# Parecer de Conformidade — Tarefa 3

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA3 — Campos inválidos/vazios (nome < 3, e-mail fora do padrão, senha < 6) exibem mensagem de erro sob cada campo inválido ao clicar "Criar conta" e nenhuma requisição é enviada (`spec.md:20`). | atendido | `apps/web/src/app/features/auth/pages/register-page/register-page.ts:12-41`; `apps/web/src/app/features/auth/pages/register-page/register-page.html:4-68`; `apps/web/src/app/features/auth/pages/register-page/register-page.spec.ts:15-64` |

## Apontamentos

## Evidências
- Diff inspecionado: `git diff 1ff6f960a32b5e4e613651c4da0397f4a1a8dfbe` (3 arquivos: `register-page.ts`, `register-page.html`, `register-page.spec.ts`).
- Testes executados: `npm run test -w apps/web -- --watch=false` — **2 arquivos, 4 testes, todos passando**.
- CA3 coberto no teste: nome `ab` (minLength), e-mail `invalido` (padrão), senha `12345` (minLength), confirmação vazia (required); após clique em "Criar conta", verifica erro sob cada campo e `httpTesting.expectNone(() => true)`.
- Fronteira CA4 respeitada: não há validação de igualdade senha/confirmação; confirmação possui apenas `Validators.required` com mensagem de obrigatoriedade (`register-page.ts:25-28`, `register-page.html:56-58`).
