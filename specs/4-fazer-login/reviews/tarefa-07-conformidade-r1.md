# Parecer de Conformidade — Tarefa 7

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA5 — ao confirmar login com dados válidos, enquanto a requisição aguarda resposta, o botão "Entrar" fica desabilitado contra novos cliques e exatamente uma única requisição é enviada (`spec.md:24`). | atendido | `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:181`, `apps/web/src/app/features/auth/pages/login-page/login-page.ts:21`, `apps/web/src/app/features/auth/pages/login-page/login-page.ts:35`, `apps/web/src/app/features/auth/pages/login-page/login-page.ts:47`, `apps/web/src/app/features/auth/pages/login-page/login-page.html:42` |

## Apontamentos

Nenhum.

## Evidências

- **Diff inspecionado:** `git diff 949214c9ae417188e8720bee8f28a6495b8320b0` (executado em `C:\Users\meryh\revela`). O diff contém apenas a adição do teste `should disable "Entrar" button and send exactly one request during pending submission (CA5)` em `login-page.spec.ts`.
- **Teste prova CA5:** preenche credenciais válidas, clica em "Entrar", verifica `submitButton.disabled === true` antes do flush (`login-page.spec.ts:201`), clica novamente durante a pendência (`login-page.spec.ts:203`), afirma `httpTesting.match(\`${environment.apiUrl}/users\`).length === 1` (`login-page.spec.ts:207-208`), faz flush e confirma `expectNone` para `/users` (`login-page.spec.ts:210-214`). Isso cobre desabilitação durante pendência, bloqueio de novo clique e exatamente uma requisição.
- **Implementação correspondente presente:** `isSubmitting` signal (`login-page.ts:21`), guarda `if (this.isSubmitting()) return` (`login-page.ts:35-37`), `isSubmitting.set(true)` antes da chamada (`login-page.ts:47`), reset em sucesso/credencial inválida/erro (`login-page.ts:54,59,63`), e binding `[disabled]="isSubmitting()"` no botão (`login-page.html:42`).
- **Adequação do 1 GET:** `AuthRepository.signIn` realiza uma única consulta `GET /users` e compara credenciais localmente (`auth-repository.ts:28-41`), consistente com a Decisão 1/Assume que 3 do plano (`plan.md:9,41`). Para o contrato atual (json-server/mock), é adequado.
- **Testes executados:** `npm test -- --watch=false` — 4 arquivos, 24 testes, todos passando. Observação: npm emitiu aviso sobre `--watch` desconhecido, mas a suíte executou e passou.

## Sugestões não bloqueantes

- O diff da tarefa contém somente o teste; a entrega de produção descrita na Tarefa 7 já está presente no working tree. Não é falha de conformidade de CA5, mas vale manter a rastreabilidade commit/tarefa clara quando houver mais alterações empilhadas no working tree.