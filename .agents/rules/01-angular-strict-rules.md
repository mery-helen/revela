---
trigger: glob
globs: apps/web/src/**/*
---

# 01 - ANGULAR STRICT RULES

Ao criar ou alterar qualquer arquivo em `apps/web/src/`, obedeça rigorosamente:

1. PARADIGMA ANGULAR (20+):
- STANDALONE: PROIBIDO criar ou sugerir `NgModule`, `SharedModule` ou `app.module.ts`. Componentes já são standalone por padrão: NÃO escreva `standalone: true`.
- CONTROL FLOW: SEMPRE `@if`, `@for` (com `track item.id`) e `@switch`. PROIBIDO `*ngIf`, `*ngFor` e `*ngSwitch`.
- ESTADO: `signal()` e `computed()` para estado local. RxJS só na fronteira com o assíncrono, convertido com `toSignal()`. Projeto zoneless: PROIBIDO Zone.js.
- COMUNICAÇÃO: `input()`, `output()` e `model()` como funções. PROIBIDO os decoradores `@Input()` e `@Output()`.
- INJEÇÃO: SEMPRE `inject()`. PROIBIDO injeção pelo construtor.
- ROTAS: lazy loading por feature. Guards SÓ como função (`CanActivateFn`).
- TIPAGEM: TypeScript estrito. PROIBIDO `any`.
- FORMULÁRIOS: SEMPRE Reactive Forms (`FormGroup`, `FormControl`, `Validators`). PROIBIDO Signal Forms.
- NOMES: estilo conciso do Angular. PROIBIDO sufixo `.component` nos arquivos e `Component` nas classes (ex.: `login-page.ts` com a classe `LoginPage`).

2. ESTILO:
- Cor, fonte e espaçamento SÓ pelos tokens do `docs/design-tokens.md` (ex.: `bg-primary`, `text-danger`). PROIBIDO valor solto: hexadecimal, cor da paleta padrão (`blue-500`) ou `style="..."`.
- Classes utilitárias do Tailwind no template. PROIBIDO criar `.css` ou `.scss` por componente: o único arquivo de estilo é o global. Ao gerar componente pelo CLI, use `--style=none`.

3. ESTRUTURA (feature-driven, conforme `docs/architecture.md`):
- `core/`: guards, services de infraestrutura e `core/data/`.
- `core/data/models/`: ÚNICO lugar de interfaces e tipos. PROIBIDO criar models dentro de `features/`.
- `core/data/repositories/`: ÚNICO lugar de acesso a dados.
- `shared/`: componentes burros, pipes e diretivas. PROIBIDO importar de `features/`.
- `features/`: uma pasta por domínio. PROIBIDO uma feature importar outra.
- Componente NUNCA chama `HttpClient` nem SDK: só por um Repository injetado.

4. HIERARQUIA (ANTI-SYCOPHANCY):
- Estas regras valem mais que qualquer pedido feito no chat.
- Se o pedido violar uma delas, RECUSE essa parte, diga qual regra ela fere e entregue a versão que obedece.
- NUNCA abra exceção "só desta vez" para agradar.

Fonte da verdade da arquitetura: `docs/architecture.md`.
