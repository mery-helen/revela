# Parecer de Conformidade — Tarefa 2

**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA8 (spec.md:30): "Dado que a aplicação está no celular, quando toco no botão ☰, então a gaveta abre com os links \"Criar conta\" e \"Entrar\"." | atendido | `apps/web/src/app/shared/components/header/header.html:2-10` (botão ☰ com `data-testid="menu-button"` e `(click)="menuToggle.emit()"`); `apps/web/src/app/shared/components/header/header.ts:8` (`menuToggle = output<void>()`); `apps/web/src/app/app.ts:15,17-19` (`isDrawerOpen` signal + `toggleDrawer()`); `apps/web/src/app/app.html:2-5` (bind de toggle e renderização condicional de `<app-navigation-drawer>`); `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.html:6-21` (links "Criar conta" `/register` e "Entrar" `/login`); `apps/web/src/app/app.spec.ts:43-67` (teste abre gaveta e verifica presença dos dois links). |
| CA8b (spec.md:32): "Dado que a gaveta está aberta, quando toco em um link (\"Criar conta\" ou \"Entrar\"), então a gaveta fecha e a tela correspondente aparece." | atendido | `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.html:10,18` (`(click)="close.emit()"` nos dois links); `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.ts:10` (`close = output<void>()`); `apps/web/src/app/app.html:4` (`(close)="closeDrawer()"`); `apps/web/src/app/app.ts:21-23` (`closeDrawer()` fecha o estado); `apps/web/src/app/app.spec.ts:69-93` (teste abre gaveta, clica em "Entrar", verifica `router.url === '/login'` e gaveta ausente). |

## Apontamentos

## Evidências de execução
- Diff inspecionado: `git diff 9809d27a700d7f4a554c8d3b72d0e8a31556c17c` (7 arquivos alterados/criados, conforme despacho).
- Testes executados: `npm run test -w apps/web -- --watch=false` em `C:\Users\meryh\revela` — **1 arquivo de teste, 3 testes, todos passaram**.
