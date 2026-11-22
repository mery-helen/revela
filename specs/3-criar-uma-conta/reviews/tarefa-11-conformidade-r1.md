# Parecer de Conformidade — Tarefa 11

**Veredito:** APONTAMENTOS

## Critérios verificados
| Critério (da spec) | Situação | Onde |
|---|---|---|
| CA8b – “Dado que a gaveta está aberta, quando toco em um link (“Criar conta” ou “Entrar”), então a gaveta fecha e a tela correspondente aparece.” | **não atendido** (não há teste que prove o fechamento da gaveta ao clicar no link) | `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.ts:10-11` (output renomeado) <br> `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.html:10-18` (emissão do output) **Ausente:** spec de componente `navigation-drawer.spec.ts` que deveria validar o comportamento de fechamento |

## Apontamentos
1. **Falta de teste que comprova CA8b** — `apps/web/src/app/shared/components/navigation-drawer/navigation-drawer.spec.ts` (arquivo inexistente)  
   Critério violado: **CA8b** (linha 32 da spec)  
   Evidência: O componente emite o output `closed` ao clicar nos links (linhas 10‑18), porém nenhum arquivo de teste verifica que a gaveta realmente se fecha ao disparar esse output. Os testes executados (`npm test`) não incluem nenhum caso que cubra esse comportamento.

*Recomendação:* criar um teste de unidade para `NavigationDrawer` que:
- simule a abertura da gaveta,
- dispare o evento de clique no link,
- valide que o output `closed.emit()` foi chamado e que a gaveta deixa de estar visível (ou que o componente pai reage ao evento fechando a gaveta).

Com o teste adicionado, o critério CA8b ficará atendido e a tarefa poderá ser aprovada.