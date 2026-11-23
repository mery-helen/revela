# Parecer de Conformidade — Tarefa 5

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA2: Dado que informo um e-mail inexistente ou uma senha que não corresponde à do cadastro, quando clico no botão "Entrar", então vejo a mensagem "E-mail ou senha inválidos" abaixo do formulário, permaneço na tela de login e todos os dados digitados são preservados nos campos. | atendido | `apps/web/src/app/features/auth/pages/login-page/login-page.html:47-53`; `apps/web/src/app/features/auth/pages/login-page/login-page.ts:45-46,49-60`; `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:100-138` |
| Apontamento R1 aceito: mensagem de credenciais inválidas abaixo do formulário, bloco `@if (invalidCredentials())` com `data-testid="error-invalid-credentials"` fora do `</form>` | atendido | `apps/web/src/app/features/auth/pages/login-page/login-page.html:47-53` |

## Apontamentos

## Evidências de execução
- Diff revisado: `git diff f06dcef19f78c5554144fd669860ae7df5c3fcc3` (working tree/index) — alterações em `login-page.html`, `login-page.ts`, `login-page.spec.ts` e artefatos de revisão da rodada 1.
- Testes: `npm test -- --watch=false` executado em `C:\Users\meryh\revela` — **22 testes passaram, 4 arquivos de teste passaram** (Vitest v5.1.1).

## Observações não bloqueantes
- O teste do CA2 cobre o cenário de e-mail inexistente (`request.flush([])`); o texto do CA2 inclui também "senha divergente". Como ambos os casos convergem para o retorno `null` já tratado pelo contrato de `AuthRepository.signIn` (Tarefa 1), não há bloqueio, mas um cenário explícito de senha divergente reforçaria a rastreabilidade do critério.