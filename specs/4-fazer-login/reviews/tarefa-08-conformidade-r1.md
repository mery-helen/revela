# Parecer de Conformidade — Tarefa 8

**Veredito:** APROVADO

## Critérios verificados

| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA7 — "Dado que estou na tela de login, quando toco em \"Não tem conta? Criar conta\", então sou levado para a tela de cadastro (/register)." (`spec.md:28`) | atendido | Teste: `apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts:220-249`; Implementação: `apps/web/src/app/features/auth/pages/login-page/login-page.html:55-57` |

## Evidências

- **Diff (`git diff be31a4608d0bc38faf8d20df6f45925130f4e04b`)**: adiciona apenas o teste CA7 em `login-page.spec.ts` (`RegisterStub` em `:14-15`; caso de teste em `:220-249`). Nenhuma alteração fora do escopo da tarefa.
- **Teste prova CA7**: localiza o link pelo texto exato `"Não tem conta? Criar conta"` (`login-page.spec.ts:237-239`), verifica `href === '/register'` (`:242`), clica no link (`:244`) e verifica `router.url === '/register'` (`:248`).
- **Link na `LoginPage`**: `<a routerLink="/register" class="text-primary font-label">Não tem conta? Criar conta</a>` presente em `apps/web/src/app/features/auth/pages/login-page/login-page.html:56`, com `RouterLink` importado em `apps/web/src/app/features/auth/pages/login-page/login-page.ts:3,10`.
- **Execução de testes**: `npm test -- --watch=false` (em `apps/web`) executado com sucesso — **4 arquivos de teste, 25 testes aprovados, 0 falhas**.

## Apontamentos

Nenhum.

## Sugestões não bloqueantes

1. O diff informado contém apenas o teste; a entrega do link em `login-page.html`/`login-page.ts` já estava presente no working tree antes deste diff (confirmado por `git status --short`, que mostra apenas `M apps/web/src/app/features/auth/pages/login-page/login-page.spec.ts`). Não é bloqueante para CA7, pois o critério está atendido no estado atual do código, mas vale registrar na tarefa/histórico para rastreabilidade de qual commit introduziu a implementação.