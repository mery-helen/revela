---
issue: 3
---

# Plano — US01: Criar uma conta

## Decisões técnicas

1. **Onde moram os componentes de cabeçalho, navegação e rodapé**: em `apps/web/src/app/shared/components/`, conforme a organização de pastas do `docs/architecture.md` (componentes visuais reutilizáveis e independentes de regra de negócio). A gaveta de navegação acompanha esse mesmo nível, pois é parte da casca compartilhada.
2. **Componente de UI da gaveta**: componente próprio em `shared/components`, implementado com Tailwind CSS 4 (biblioteca de estilo declarada no `docs/architecture.md`); a iconografia usa Lucide Angular apenas se necessária. Não há biblioteca de componentes de UI declarada no `docs/architecture.md`.
3. **Encaixe da casca nas rotas**: a casca (cabeçalho, `<router-outlet>` central, rodapé) fica no `App` raiz; as telas (`/register`, stub `/groups`, stub `/login`) são rotas filhas renderizadas no `<router-outlet>` central. A gaveta é controlada pelo estado da casca.
4. **Campos da coleção `users` no json-server**: `id`, `name`, `email`, `password` (texto puro no mock, conforme Assume que 1 da spec; // TODO #26).

## Tarefas

- [x] **Tarefa 1 — Casca da aplicação e rota de cadastro** — Cobre: CA7. Teste primeiro: ao navegar para `/register`, a tela de cadastro é renderizada entre o cabeçalho e o rodapé. Entrega: shell da aplicação (cabeçalho, área central com `<router-outlet>`, rodapé), rota `/register` carregando `RegisterPage` e stubs de rota para `/groups` e `/login`.

- [ ] **Tarefa 2 — Gaveta de navegação móvel** — Cobre: CA8, CA8b. Teste primeiro: ao tocar no botão ☰ a gaveta abre com os links "Criar conta" e "Entrar"; ao tocar em um link, a gaveta fecha e a navegação ocorre. Entrega: botão de menu no cabeçalho, gaveta com os links "Criar conta" e "Entrar", comportamento de abrir/fechar.

- [ ] **Tarefa 3 — Formulário de cadastro e validações de campo** — Cobre: CA3. Teste primeiro: submeter com campos inválidos ou vazios exibe uma mensagem de erro sob cada campo inválido e nenhuma requisição é enviada. Entrega: `RegisterPage` com formulário reativo (nome, e-mail, senha, confirmação de senha) e mensagens de erro por campo.

- [ ] **Tarefa 4 — Validação de confirmação de senha** — Cobre: CA4. Teste primeiro: submeter com senha e confirmação diferentes exibe "As senhas não coincidem" abaixo do campo de confirmação. Entrega: validação de igualdade entre senha e confirmação no formulário.

- [ ] **Tarefa 5 — Link para a tela de login** — Cobre: CA9. Teste primeiro: tocar em "Já tem uma conta? Faça login" leva para a tela de login. Entrega: link na tela de cadastro apontando para `/login`.

- [ ] **Tarefa 6 — Modelo e repositório de autenticação** — Cobre: passo técnico (destrava CA1, CA2, CA5, CA6). Teste primeiro: o repositório cria uma conta enviando os dados e verifica e-mail já cadastrado de forma case-insensitive e ignorando espaços nas pontas. Entrega: modelo `User` em `core/data/models`, `AuthRepository` em `core/data/repositories`, `provideHttpClient()` no `app.config`.

- [ ] **Tarefa 7 — Cadastro com sucesso** — Cobre: CA1. Teste primeiro: submeter formulário válido cria a conta, autentica a pessoa e redireciona para a tela de grupos. Entrega: integração do formulário com `AuthRepository`, persistência da sessão autenticada e redirecionamento para `/groups`.

- [ ] **Tarefa 8 — E-mail já cadastrado** — Cobre: CA2. Teste primeiro: submeter com e-mail já cadastrado (case-insensitive, ignorando espaços nas pontas) exibe "Este e-mail já está em uso" e nenhum registro é gravado. Entrega: tratamento de duplicidade no fluxo de cadastro.

- [ ] **Tarefa 9 — Erro de servidor** — Cobre: CA5. Teste primeiro: falha do servidor exibe "Não foi possível conectar ao servidor. Tente novamente." no topo do formulário, preserva os dados digitados, não grava nada e reabilita o botão. Entrega: tratamento de erro no envio do cadastro.

- [ ] **Tarefa 10 — Prevenção de duplo clique** — Cobre: CA6. Teste primeiro: enquanto a requisição está em andamento o botão "Criar conta" fica desabilitado e apenas uma requisição é enviada. Entrega: estado de envio no formulário que bloqueia submissões duplicadas.

## Critérios sem tarefa

Nenhum.
