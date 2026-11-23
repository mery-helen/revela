# Parecer de Conformidade — Tarefa 6

**Veredito:** APROVADO

## Critérios verificados

| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA4 — Dado que o servidor está fora do ar, ocorre erro 500 ou timeout, quando confirmo o login, então a mensagem "Não foi possível conectar ao servidor. Tente novamente." é exibida no topo do formulário, todos os dados digitados são preservados nos campos, nada é gravado e o botão volta ao estado normal habilitado. | atendido | `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:140-179`, `apps/web/src/app/features/auth/pages/login-page/login-page.ts:20,46-47,61-64`, `apps/web/src/app/features/auth/pages/login-page/login-page.html:5-9,42` |
| CA1, CA2, CA3, CA5, CA6, CA7 | fora desta tarefa | — |

## Apontamentos

## Evidências

- **Diff revisado (`git diff 24e94f164fbd7e2d2a4fe91df42b314920627760`)**: adiciona apenas o teste CA4 em `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:140-179`; não há alteração fora do escopo da tarefa.
- **Mensagem no topo do formulário**: o teste preenche credenciais, dispara o submit, intercepta `GET ${environment.apiUrl}/users` com `expectOne` e `flush('Server Error', { status: 500, statusText: 'Internal Server Error' })`, depois afirma `[data-testid="error-server"]` com texto exato `"Não foi possível conectar ao servidor. Tente novamente."` (`login-page.spec.ts:162-172`). No template, o bloco `@if (serverError())` com `data-testid="error-server"` é o primeiro elemento dentro do `<form>`, antes dos campos (`login-page.html:4-9`), atendendo “topo do formulário”.
- **Dados preservados**: o teste afirma `emailInput!.value === 'maria@example.com'` e `passwordInput!.value === '123456'` após o erro (`login-page.spec.ts:174-175`).
- **Nada gravado / não autentica / não navega**: o fluxo de login faz 1 `GET /users` (`login-page.spec.ts:162-163`); o teste afirma `authSession.authenticatedUser()` nulo e `router.url` diferente de `/groups` (`login-page.spec.ts:176-177`). A implementação, no caminho de erro, apenas marca `serverError` e reabilita envio (`login-page.ts:61-64`), sem chamar `setAuthenticatedUser` nem navegar.
- **Botão reabilitado**: o teste afirma `submitButton!.disabled === false` (`login-page.spec.ts:178`). O template liga o estado ao sinal `[disabled]="isSubmitting()"` (`login-page.html:42`) e o handler de erro executa `this.isSubmitting.set(false)` (`login-page.ts:63`).
- **Testes executados**: `npm test -- --watch=false` passou — 4 arquivos, 23 testes, 0 falhas.

## Observações não bloqueantes

- O CA4 menciona “fora do ar, ocorre erro 500 ou timeout”; o teste cobre o caso representativo de erro HTTP 500. A cobertura de timeout não foi adicionada, mas o caminho de tratamento de erro observado é o mesmo e não impede a conformidade do critério nesta tarefa.