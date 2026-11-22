# Parecer de Código — Tarefa 6

**Veredito:** APONTAMENTOS

## Apontamentos (bloqueiam)

1. **Tipo de entrada do cadastro definido fora de `core/data/models`** — `apps/web/src/app/core/data/repositories/auth-repository.ts:8`
   Regra violada: `AGENTS.md` ("Models só em `core/data/models/`") e `docs/architecture.md` §4.1 ("Local único de definição das interfaces e tipos de dados do domínio. Features **não** criam modelos próprios."). O `CreateAccountPayload` é um contrato de dados do domínio/autenticação, mas foi declarado no repositório.
   Prejuízo concreto: abre precedente para tipos/contratos de dados espalhados fora da camada canônica; quando outra parte do fluxo (ex.: tarefas 7-8) precisar do mesmo payload, tende a duplicar tipo ou importar do repositório, acoplando consumidores à implementação de acesso a dados.

2. **`User` inclui `password` no modelo de domínio, divergindo do glossário** — `apps/web/src/app/core/data/models/user.model.ts:6`
   Regra violada: `docs/architecture.md` §5.1 define `User` com `id, name, email` e registra "Senha tratada pelo serviço de autenticação". A spec Assume 1/#26 permite senha em texto puro apenas como simplificação temporária do mock, mas o shape atual coloca a credencial no contrato `User` compartilhado.
   Prejuízo concreto: qualquer código que ler/manipular `User` passa a carregar `password`, aumentando risco de exposição acidental em logs, estado, templates ou serialização; na migração #26, remover o campo exigirá tocar todos os usos do modelo, em vez de isolar a credencial na borda mock/auth. É necessário tornar o caráter provisório/mock explícito no contrato (ex.: tipo/DTO separado para persistência mock ou modelagem que não espalhe credencial como campo comum de `User`).

## Sugestões (não bloqueiam)

- **Cobrir normalização simétrica no teste de criação, se for contrato desejado** — `apps/web/src/app/core/data/repositories/auth-repository.spec.ts:26`. O teste de `createAccount` envia e-mail já normalizado; como `isEmailRegistered` normaliza case/espaços, vale explicitar no teste/contrato se `createAccount` também persistirá e-mail normalizado ou se a normalização é responsabilidade do chamador. Hoje não quebra, mas deixa ambígua a fronteira de responsabilidade para as tarefas 7-8.

## Observações fora do escopo deste diff

- Nenhuma observação fora do escopo identificada neste diff.

## Evidência de verificação

- Diff revisado: `git diff 54ae875b4f598fe0e99a364ccadef96655ef83aa` (commit `54ae875`, 4 arquivos, escopo da Tarefa 6).
- Testes executados em `C:\Users\meryh\revela`: `npm run test -w apps/web -- --watch=false` — **3 arquivos, 9 testes, todos passando**. Isso confirma o comportamento testado, mas não elimina os apontamentos de arquitetura/contrato acima.
