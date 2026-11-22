# Parecer de Código — Tarefa 1 (rodada 2)

**Veredito:** APROVADO

## Apontamentos (bloqueiam)
- Nenhum.

## Sugestões (não bloqueiam)
- `apps/web/src/app/app.spec.ts:15` — O teste valida CA7 (navegação para `/register`, presença entre cabeçalho/rodapé e ordem no DOM). Como a tarefa também entrega stubs de `/login` e `/groups`, vale considerar, em tarefa futura, smoke tests de rota para esses stubs para evitar regressão silenciosa; não bloqueia a Tarefa 1.

## Observações fora do escopo deste diff
- `package-lock.json` — alteração grande no diff; não avaliada como regra de arquitetura de aplicação, apenas registrada como fora do escopo funcional da tarefa.

## Verificação dos apontamentos da r1
1. **Teste não executava/falhava com `header` null (hipótese RouterTestingHarness renderizando só a rota):** corrigido. `apps/web/src/app/app.spec.ts:8-41` agora monta o `App` com `TestBed.createComponent(App)`, provê `provideRouter(routes)`, navega com `router.navigateByUrl('/register')`, aguarda estabilização e verifica `header`, `footer`, `[data-page="register"]` e ordem relativa. Não usa `RouterTestingHarness`.
2. **Teste deve passar no ambiente padrão:** atendido. Execução real em `C:\Users\meryh\revela\apps\web`: `npm test -- --run` falhou por argumento desconhecido (`Error: Unknown argument: run`); fallback executado com `npm run test -- --watch=false` passou: **1 arquivo, 1 teste, 1 passed** (Vitest v5.1.1).

## Conformidade verificada (escopo da tarefa)
- **CA7 coberto:** teste da tarefa navega para `/register` e confirma renderização da página de cadastro entre cabeçalho e rodapé (`apps/web/src/app/app.spec.ts:15-41`, `apps/web/src/app/app.html:1-7`).
- **Arquitetura/Angular:** componentes standalone implícitos, sem `NgModule`, sem `@Input/@Output`, sem `HttpClient`, sem `any`, nomes concisos sem sufixo `.component`/`Component` (`App`, `Header`, `Footer`, `RegisterPage`, `LoginPage`, `GroupsListPage`), lazy loading por `loadComponent` em `apps/web/src/app/app.routes.ts:4-20`, estrutura feature/shared conforme `docs/architecture.md`.
- **Estilo:** classes Tailwind/tokens utilitários no template; sem CSS/SCSS por componente adicionado e sem valores soltos/hex.
