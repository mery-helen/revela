# 📄 Product Requirements Document (PRD)

**Projeto:** Revela

**Versão:** 1.0.0

**Última atualização:** 2026-08-26

> 🤖 **Este documento é a fonte da verdade sobre o QUE o produto faz.** Regra de negócio que não estiver aqui não existe — nem para a equipe, nem para a IA.
>
> Tecnologia **não** se discute aqui: isso é assunto do `architecture.md`.

---

## 🎯 1. Visão Geral e Objetivo

**O problema:** Organizar um amigo secreto presencialmente exige reunir todos os participantes ao mesmo tempo, pode gerar sorteios incorretos e pode causar perda dos papéis com os nomes sorteados ou das listas de desejos.

**A solução:** O Revela é uma aplicação web para organizar grupos de amigo secreto de forma simples e segura. O organizador cria um grupo, compartilha um link de convite, acompanha os participantes e realiza o sorteio automaticamente. Cada participante pode visualizar apenas o próprio resultado e consultar a lista de desejos da pessoa que tirou.

**Como saberemos que deu certo:** Um grupo com 3 ou mais participantes é criado, os participantes entram por meio do convite, o sorteio é realizado sem que ninguém tire a si mesmo e cada participante consegue visualizar individualmente o próprio amigo secreto.

---

## 📖 2. Glossário Ubíquo

| Termo | Significa | Não confundir com |
| :--- | :--- | :--- |
| Usuário | Pessoa que possui uma conta no Revela | Visitante, que não possui sessão autenticada |
| Grupo | Evento de amigo secreto criado por um organizador | Lista de participantes |
| Organizador | Usuário que criou o grupo e possui permissão para gerenciá-lo | Participante comum |
| Participante | Usuário autenticado que faz parte de um grupo | Visitante |
| Convite | Link ou código utilizado para entrar em um grupo | Grupo |
| Sorteio | Processo que relaciona cada participante a outro participante | Revelação |
| Resultado | Pessoa que um participante recebeu no sorteio | Lista de desejos |
| Lista de Desejos | Lista de sugestões de presentes cadastrada por um participante | Resultado do sorteio |
| Exclusão | Restrição que impede duas pessoas de serem sorteadas uma para a outra | Resultado |

---

## 👤 3. Atores e Permissões

| Ator | Quem é | Pode | Não pode |
| :--- | :--- | :--- | :--- |
| Visitante | Pessoa não autenticada | Criar conta, acessar a tela de login | Entrar em grupos, visualizar resultados ou criar grupos |
| Participante | Usuário autenticado que participa de um grupo | Entrar em grupos por convite, visualizar seu resultado e cadastrar/visualizar listas de desejos relacionadas ao seu sorteio | Realizar sorteios, definir exclusões ou visualizar resultados de outros participantes |
| Organizador | Usuário autenticado que criou o grupo | Criar e gerenciar o grupo, gerar convites, definir exclusões e realizar o sorteio | Visualizar o resultado individual dos outros participantes |

> ⚠️ As permissões de segurança serão efetivamente implementadas quando a autenticação e o backend real forem incorporados ao projeto.

---

## 📝 4. Escopo Funcional (User Stories)

> Cada história possui **ID**, prioridade **MoSCoW**, status e critérios de aceite.
>
> **Vocabulário fechado de Status:** `Ready` · `Em implementação` · `Feito`.
>
> As histórias classificadas como **W (Won't have)** não fazem parte desta tabela.

---

### US01 — Criar uma conta · `M` · Status: `Ready`

**Como** visitante, **eu quero** criar uma conta **para que** eu possa criar ou participar de grupos de amigo secreto.

**Critérios de aceite:**

- [ ] **Dado** que preencho nome, e-mail e senha válidos, **quando** confirmo o cadastro, **então** minha conta é criada e sou redirecionado para meus grupos.

- [ ] **Dado** que informo um e-mail já cadastrado, **quando** confirmo, **então** vejo a mensagem "Este e-mail já está em uso" e nada é gravado.

**Regras relacionadas:** RN01

---

### US02 — Fazer login · `M` · Status: `Ready`

**Como** usuário cadastrado, **eu quero** fazer login **para que** eu possa acessar meus grupos.

**Critérios de aceite:**

- [ ] **Dado** e-mail e senha corretos, **quando** confirmo o login, **então** vejo a lista dos meus grupos.

- [ ] **Dado** e-mail ou senha incorretos, **quando** confirmo, **então** vejo "E-mail ou senha inválidos" e permaneço na tela de login.

---

### US03 — Criar um grupo de amigo secreto · `M` · Status: `Ready`

**Como** organizador, **eu quero** criar um grupo informando nome, data da revelação e valor sugerido do presente **para que** eu tenha um espaço para reunir os participantes.

**Critérios de aceite:**

- [ ] **Dado** que preencho nome do grupo, data da revelação e valor sugerido do presente, **quando** confirmo a criação, **então** o grupo aparece em "Meus grupos" com status "Aguardando participantes".

- [ ] **Dado** que não tenho nenhum grupo criado, **quando** abro "Meus grupos", **então** vejo o estado vazio com um convite para criar o primeiro grupo.

**Regras relacionadas:** RN02

---

### US04 — Convidar participantes para o grupo · `M` · Status: `Ready`

**Como** organizador, **eu quero** gerar um link ou código de convite **para que** as pessoas possam entrar no meu grupo.

**Critérios de aceite:**

- [ ] **Dado** que estou na página do grupo, **quando** clico em "Convidar", **então** um link único do grupo é gerado e posso copiá-lo.

- [ ] **Dado** que o sorteio já foi realizado, **quando** tento gerar um novo convite, **então** vejo a mensagem "O sorteio já foi feito, não é possível adicionar participantes".

**Regras relacionadas:** RN03

---

### US05 — Entrar em um grupo via convite · `M` · Status: `Ready`

**Como** usuário autenticado, **eu quero** entrar em um grupo usando o link de convite **para que** eu participe do sorteio.

**Critérios de aceite:**

- [ ] **Dado** um link de convite válido, **quando** confirmo minha entrada, **então** meu nome aparece na lista de participantes do grupo.

- [ ] **Dado** que já sou participante desse grupo, **quando** uso o link novamente, **então** vejo "Você já faz parte deste grupo" sem duplicar meu cadastro.

**Regras relacionadas:** RN03

---

### US06 — Realizar o sorteio · `M` · Status: `Ready`

**Como** organizador, **eu quero** realizar o sorteio dos participantes **para que** cada participante receba um amigo secreto de forma aleatória e sem repetição.

**Critérios de aceite:**

- [ ] **Dado** que há pelo menos 3 participantes no grupo, **quando** confirmo o sorteio, **então** cada participante recebe exatamente uma pessoa, ninguém tira a si mesmo e o status do grupo muda para "Sorteado".

- [ ] **Dado** que há menos de 3 participantes, **quando** tento sortear, **então** vejo "É preciso pelo menos 3 participantes para sortear" e o sorteio não é executado.

- [ ] **Dado** que existem exclusões cadastradas que tornam o sorteio impossível, **quando** tento sortear, **então** vejo "Não é possível sortear com essas restrições" e o sorteio não é executado.

**Regras relacionadas:** RN04, RN05

---

### US07 — Visualizar quem eu tirei · `M` · Status: `Ready`

**Como** participante, **eu quero** visualizar de forma oculta quem eu tirei **para que** o segredo seja mantido entre os demais.

**Critérios de aceite:**

- [ ] **Dado** que o sorteio já foi realizado, **quando** abro "Meu amigo secreto", **então** vejo apenas o nome da pessoa que eu tirei, sem indicação de quem tirou a mim.

- [ ] **Dado** que o sorteio ainda não foi realizado, **quando** abro essa tela, **então** vejo o estado "Aguardando o sorteio".

**Regras relacionadas:** RN06

---

### US08 — Definir exclusões no sorteio · `S` · Status: `Ready`

**Como** organizador, **eu quero** marcar que duas pessoas não podem tirar uma à outra **para que** o sorteio evite pares indesejados.

**Critérios de aceite:**

- [ ] **Dado** que marquei duas pessoas como "não podem se tirar", **quando** o sorteio é realizado, **então** nenhuma das duas recebe a outra como resultado.

- [ ] **Dado** que as exclusões tornam o sorteio matematicamente impossível, **quando** tento sortear, **então** vejo "Não é possível sortear com essas restrições" e nada é gravado.

**Regras relacionadas:** RN05

---

### US09 — Cadastrar lista de desejos · `S` · Status: `Ready`

**Como** participante, **eu quero** cadastrar sugestões de presente **para que** quem me tirou saiba o que eu gostaria de ganhar.

**Critérios de aceite:**

- [ ] **Dado** que estou no meu perfil no grupo, **quando** adiciono itens à minha lista de desejos, **então** eles ficam salvos e visíveis para quem me tirar.

- [ ] **Dado** que ainda não cadastrei nada, **quando** abro minha lista, **então** vejo o estado vazio convidando a adicionar um item.

---

### US10 — Ver a lista de desejos de quem tirei · `S` · Status: `Ready`

**Como** participante, **eu quero** ver a lista de desejos da pessoa que tirei **para que** eu escolha um presente melhor.

**Critérios de aceite:**

- [ ] **Dado** que a pessoa que tirei cadastrou desejos, **quando** abro "Meu amigo secreto", **então** vejo a lista dela junto com o nome.

- [ ] **Dado** que ela não cadastrou nada, **quando** abro a tela, **então** vejo "Nenhuma sugestão cadastrada ainda".

---

## 📋 Resumo do Escopo

| ID | História | MoSCoW | Status |
| :--- | :--- | :---: | :--- |
| US01 | Criar uma conta | M | Ready |
| US02 | Fazer login | M | Ready |
| US03 | Criar um grupo de amigo secreto | M | Ready |
| US04 | Convidar participantes para o grupo | M | Ready |
| US05 | Entrar em um grupo via convite | M | Ready |
| US06 | Realizar o sorteio | M | Ready |
| US07 | Visualizar quem eu tirei | M | Ready |
| US08 | Definir exclusões no sorteio | S | Ready |
| US09 | Cadastrar lista de desejos | S | Ready |
| US10 | Ver a lista de desejos de quem tirei | S | Ready |

---

## 🛡️ 5. Regras de Negócio (Constraints)

| ID | Regra | Nasce de |
| :--- | :--- | :--- |
| RN01 | O e-mail deve ser único por conta no sistema. | US01 |
| RN02 | Um grupo precisa ter nome, data de revelação e valor sugerido do presente para ser criado. | US03 |
| RN03 | Só é possível entrar em um grupo antes do sorteio ser realizado. | US04, US05 |
| RN04 | O sorteio exige no mínimo 3 participantes cadastrados. | US06 |
| RN05 | Ninguém pode tirar a si mesmo nem uma pessoa definida como exclusão. | US06, US08 |
| RN06 | Um participante só pode visualizar o próprio resultado sorteado. | US07 |

---

## 🚫 6. Fora de Escopo (Non-goals)

| Não faremos nesta versão | Por quê |
| :--- | :--- |
| Refazer o sorteio | Simplificação de escopo para manter o foco no MVP. |
| Receber lembrete por e-mail | Requer infraestrutura externa de envio e agendamento de mensagens. |
| Personalizar tema visual do grupo | Funcionalidade estética que não é essencial para o funcionamento do MVP. |
| Chat interno entre participantes | Grupos de amigo secreto podem utilizar mensageiros externos, como WhatsApp ou Telegram. |
| Intermediação financeira / pagamentos | O Revela não realiza cobrança ou venda de presentes. |
| Aplicativo móvel nativo para iOS/Android | O escopo é uma aplicação Web Responsiva com possibilidade de comportamento PWA. |

---

## ⚙️ 7. Requisitos Não Funcionais (Qualidade)

| # | Requisito | Como verificar |
| :--- | :--- | :--- |
| RNF01 | Mobile-First: o layout deve ser totalmente utilizável a partir de 360 px de largura. | Chrome DevTools em 360 px, sem rolagem horizontal. |
| RNF02 | Contraste mínimo AA (WCAG 2.2) em textos e componentes interativos principais. | Validação com axe DevTools. |
| RNF03 | Ações do usuário devem apresentar retorno visual em até 1 segundo em condições normais de execução. | Verificação visual durante os fluxos principais. |
| RNF04 | Toda tela que busca dados deve apresentar os estados de carregamento, vazio e erro. | Teste visual simulando carregamento, ausência de dados e erro. |
| RNF05 | Formulários de cadastro e login devem permitir navegação completa por teclado. | Executar os fluxos utilizando apenas Tab, Shift+Tab, Enter e teclado. |

---

## 🛠️ 8. Histórico

| Data | Versão | O que mudou |
| :--- | :--- | :--- |
| 2026-08-26 | 1.0.0 | Versão inicial do PRD: US01–US10, RN01–RN06 e requisitos não funcionais. |