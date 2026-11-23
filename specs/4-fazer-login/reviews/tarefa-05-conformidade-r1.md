# Parecer de Conformidade — Tarefa 5

**Veredito:** COM APONTAMENTOS

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA2: Dado que informo um e-mail inexistente ou uma senha que não corresponde à do cadastro, quando clico no botão "Entrar", então vejo a mensagem "E-mail ou senha inválidos" abaixo do formulário, permaneço na tela de login e todos os dados digitados são preservados nos campos. | não atendido (parcial) | `apps/web/src/app/features/auth/pages/login-page/login-page.html:11-15`; `apps/web/src/app/features/auth/pages/login-page/login-page.ts:50-60`; `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:100-138` |

## Apontamentos
1. **Mensagem de credenciais inválidas não está "abaixo do formulário" como exige o CA2** — `apps/web/src/app/features/auth/pages/login-page/login-page.html:11-15`
   Critério violado: CA2 — "vejo a mensagem \"E-mail ou senha inválidos\" abaixo do formulário..." (`specs/4-fazer-login/spec.md:18`). O plano também reforça: "Local das mensagens: \"E-mail ou senha inválidos\" abaixo do formulário (CA2)..." (`specs/4-fazer-login/plan.md:13`).
   Evidência: No template, o bloco `@if (invalidCredentials()) { ... data-testid="error-invalid-credentials" ... }` está dentro do `<form>` (aberto em `login-page.html:4`, fechado em `login-page.html:53`), antes dos campos de e-mail/senha (`login-page.html:11-15`). Isso posiciona a mensagem no topo do formulário, não abaixo dele. O teste de CA2 (`login-page.spec.ts:100-138`) verifica presença, texto exato, permanência em rota diferente de `/groups`, preservação dos valores e `authSession` nulo, mas não verifica o posicionamento relativo ao formulário — por isso não capturou a divergência.

## Observações não bloqueantes
- **Cobertura de cenário "senha divergente"**: O CA2 inclui "e-mail inexistente ou uma senha que não corresponde à do cadastro". O teste adicionado cobre o caso de e-mail inexistente (`request.flush([])`, `login-page.spec.ts:124`). O caso de senha divergente segue o mesmo caminho de retorno `null` do `AuthRepository.signIn`; se a Tarefa 1 já cobre esse retorno no repositório, o risco é baixo, mas o teste da tarefa não exercita explicitamente o cenário alternativo citado no texto do CA2/plano.
- **Asserção de permanência em `/login`**: O teste usa `expect(router.url).not.toBe('/groups')` (`login-page.spec.ts:134`). Em um setup com rota `/groups` stub, isso é compatível com "permanece na tela de login", mas não afirma positivamente que a URL é `/login`. Não bloqueia, pois o comportamento principal de não navegação está coberto.

## Evidências de execução
- `git diff f06dcef19f78c5554144fd669860ae7df5c3fcc3`: alterou apenas `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts` (+40 linhas, teste CA2) e `apps/web/src/app/features/auth/pages/login-page/login-page.ts` (+4 linhas, tratamento de `user === null` com `invalidCredentials.set(true)` e reset de `isSubmitting`).
- `npm test -- --watch=false`: **22 testes passaram, 4 arquivos de teste passaram** (Vitest v5.1.1). Observação: npm emitiu aviso `Unknown cli config "--watch"`; a execução de teste ocorreu normalmente.