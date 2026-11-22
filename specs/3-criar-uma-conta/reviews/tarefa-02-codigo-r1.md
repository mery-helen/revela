# Parecer de Código — Tarefa 2

**Veredito:** APROVADO

## Apontamentos (bloqueiam)
Nenhum.

## Sugestões (não bloqueiam)
- **`Header`: estado acessível do botão de menu ausente** — `apps/web/src/app/shared/components/header/header.html:2`
  O botão tem `aria-label="Abrir menu"` fixo, mas não expõe `aria-expanded` nem `aria-controls` vinculados ao drawer. Como o mesmo controle alterna abrir/fechar (`toggleDrawer()`), leitores de tela não recebem o estado atual. Prejuízo concreto: usuários de tecnologia assistiva não sabem se a gaveta está aberta ou fechada. Sugestão: receber o estado aberto como `input()`/binding e refletir `aria-expanded` e `aria-controls="..."` no botão; ajustar o rótulo quando apropriado.

- **Botão ☰ visível em todos os breakpoints** — `apps/web/src/app/shared/components/header/header.html:2`
  O botão de menu é renderizado sem restrição responsiva. O CA8 é explícito para contexto mobile, e a spec marca "Navegação no desktop: opção A, links na barra superior, sem menu lateral" como fora de escopo (spec §4, item 44). Não bloqueia a tarefa atual, mas cria dívida: ao implementar a navegação desktop, esse controle precisará ser condicionado ao breakpoint mobile para não conflitar com a decisão registrada.

- **Fechamento da gaveta só por link/toggle** — `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.ts:10`
  A gaveta fecha ao clicar em link (`close.emit()`) e pelo toggle no header, atendendo CA8b. Não há tratamento para `Escape` ou clique fora. Prejuízo concreto limitado ao escopo atual, mas vale registrar para acessibilidade/UX mobile em tarefa futura.

## Observações fora do escopo deste diff
- A rota `/login` referenciada no drawer (`routerLink="/login"`) depende da US02 (spec §5, Assume que 4 / Issue #4). Não é problema deste diff, apenas dependência conhecida.
- Não há specs unitários dedicados para `Header` e `NavigationDrawer`; a cobertura atual está concentrada em `app.spec.ts` e valida CA8/CA8b. Cobertura suficiente para a tarefa, mas componentes compartilhados tendem a se beneficiar de testes próprios conforme evoluem.

## Evidências consideradas
- Diff revisado: `git diff 9809d27a700d7f4a554c8d3b72d0e8a31556c17c` (7 arquivos, incluindo `navigation-drawer` novo em `shared/components`).
- Regras conferidas: `docs/architecture.md` (§3, §4.1-§4.2), `.agents/rules/01-angular-strict-rules.md` (standalone sem `standalone: true`, `@if`, `signal()`, `input()/output()`, `inject()` não necessário, sem `HttpClient` em componente, sem CSS por componente, feature/shared boundaries).
- Spec conferida: `specs/3-criar-uma-conta/spec.md` CA8, CA8b, fora de escopo 44.
- Testes executados: `npm run test -w apps/web -- --watch=false` — **3 passed (3)**, 1 arquivo de teste.
