# Parecer de Código — Tarefa 1

**Veredito:** APONTAMENTOS

## Apontamentos (bloqueiam)
1. **Teste da Tarefa 1 não pôde ser executado no ambiente atual (comando obrigatório não rodou)** — execução em `C:\Users\meryh\revela\apps\web` com `npm test -- --run`
   Regra violada: `docs/architecture.md` §2 (Testes e Qualidade: “Testes unitários: Vitest…” / fluxo esperado de execução via scripts do workspace) e a instrução da tarefa (“Teste primeiro…” / validar com `npm test -- --run`).
   Prejuízo concreto: a entrega não comprova que o teste adicionado para CA7 (`app.spec.ts`: renderiza cadastro entre cabeçalho e rodapé ao navegar para `/register`) passa no ambiente padrão; risco de regressão ou falso verde só descoberta depois (CI/outro dev). Evidência do comando: falhou com `Node packages may not be installed. Try installing with 'npm install'.` e erro do builder `@angular/build:unit-test` não encontrado (saída registrada na revisão).

## Sugestões (não bloqueiam)
- **Cobertura da tarefa além de CA7 (stubs `/login` e `/groups`)**: as rotas e páginas stub foram adicionadas (bom para a entrega descrita). Considere, em tarefa/commit seguinte, testes mínimos de navegação/render para `/login` e `/groups` se a suíte passar a cobrir fluxos de rota, para evitar que quebrem silenciosamente (hoje só `/register` é assertado).
- **Estrutura HTML do shell**: o uso de `<section class="flex-1 ...">` envolvendo o `<router-outlet />` é funcional; se o time quiser semântica mais explícita, poderia ser `<main>` já existe no root e o conteúdo roteado poderia ficar em `<div role="region">` ou manter como está — preferência de estilo, sem prejuízo concreto observado.

## Observações fora do escopo deste diff
- **`apps/web/src/app/app.css`** permanece vazio no repo (não alterado aqui); alinhado à regra “único arquivo de estilo é o global”/uso de utilitários — sem ação necessária neste diff.
- **Rotas sem `pathMatch`/redirect raiz**: não há rota `''` ou `**` no diff; se a intenção futura for redirecionar para `/login` ou `/groups`, isso ficará para tarefas seguintes (não é violação do escopo da Tarefa 1).
- **`RegisterPage`/`LoginPage`/`GroupsListPage` como stubs** sem `data-page` adicional além do já usado nos testes para register — consistente com o que o teste exige; manter padrão `data-page` se outros testes forem adicionados.

**Resumo (alinhamento ao solicitado):** O diff atende ao enunciado da Tarefa 1 em estrutura (shell com `Header`/`<router-outlet/>`/`Footer` em `app.html`, rota `/register` lazy para `RegisterPage`, stubs lazy para `/login` e `/groups`) e segue as regras observáveis do `docs/architecture.md`/regras Angular no que foi tocado (standalone implícito, sem sufixo `Component` nos nomes de classe/arquivo, sem `NgModule`, sem `HttpClient`, pastas `features/*/pages/*` e `shared/components/*`, Tailwind via classes, uso de tokens utilitários coerentes com o padrão do projeto). O único bloqueio registrado é a impossibilidade de executar `npm test -- --run` em `C:\Users\meryh\revela\apps\web` devido a `node_modules` ausente (registrado explicitamente).
