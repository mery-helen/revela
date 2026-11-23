# Parecer de Conformidade — Tarefa 4

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA1: Dado que preencho e-mail e senha corretos (e-mail existente no sistema, comparação case-insensitive e ignorando espaços nas pontas, e senha idêntica à armazenada), quando clico no botão "Entrar", então fico autenticado e sou redirecionado para /groups. | atendido | `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:26`; `apps/web/src/app/features/auth/pages/login-page/login-page.ts:34` |

## Apontamentos

## Observações não bloqueantes
- O `onSubmit` já inclui guarda de `isSubmitting`, limpeza de erros e tratamento de `error`/`null` (`login-page.ts:35`, `login-page.ts:45-61`). Isso antecipa comportamentos de CA2/CA4/CA5, mas não infla o comportamento exigido por CA1 nem prejudica a conformidade desta tarefa; as tarefas correspondentes ainda devem provar esses critérios com testes próprios.