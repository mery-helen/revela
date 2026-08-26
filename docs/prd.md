# 📄 Product Requirements Document (PRD)

**Projeto:** [Nome do Projeto]
**Versão:** 1.0.0
**Última atualização:** [AAAA-MM-DD]

> 🧹 **Antes de entregar:** apague todas as linhas marcadas com `Ex:` — elas são
> exemplo de um domínio fictício (reserva de salas de estudo), não do seu projeto.
>
> 🤖 **Este documento é a fonte da verdade sobre o QUE o produto faz.** Regra de
> negócio que não estiver aqui não existe — nem para a equipe, nem para a IA.
> Tecnologia **não** se discute aqui: isso é assunto do `architecture.md`.

---

## 🎯 1. Visão Geral e Objetivo

**O problema:** [Quem sofre com o quê, hoje, sem o seu software?]

**A solução:** [Em 2–3 frases, o que o sistema faz.]

**Como saberemos que deu certo:** [1 ou 2 sinais observáveis. Ex: "um grupo
consegue reservar uma sala sem conflito de horário, do login à confirmação."]

---

## 📖 2. Glossário Ubíquo

> Os termos de negócio que **todo mundo** usa da mesma forma — pessoa, código,
> banco e IA. Se dois nomes disputam o mesmo conceito, escolha um e mate o outro.

| Termo | Significa | Não confundir com |
| :--- | :--- | :--- |
| Ex: Reserva | Bloqueio de uma sala por uma pessoa, num intervalo de tempo | Sala (o espaço físico, que existe sem reserva) |
| Ex: Sala | Espaço físico disponível para reserva | Reserva |

---

## 👤 3. Atores e Permissões

| Ator | Quem é | Pode | Não pode |
| :--- | :--- | :--- | :--- |
| Ex: Visitante | Não autenticado | Ver a lista de salas | Reservar |
| Ex: Usuário | Autenticado | Criar/cancelar as **próprias** reservas | Ver ou cancelar reserva alheia |
| Ex: Administrador | Autenticado, papel `admin` | Cadastrar salas, cancelar qualquer reserva | — |

> ⚠️ A coluna **"Não pode"** vira política de RLS no `architecture.md` §6.
> Se estiver vaga aqui, a segurança nasce vaga lá.

---

## 📝 4. Escopo Funcional (User Stories)

> Cada história tem **ID**, **prioridade MoSCoW** e **critérios de aceite**.
> Sem critério de aceite não é história: é desejo. O critério é o contrato que
> permite dizer "isto está pronto" — e é o que impede a IA de inventar o
> comportamento que ela achar razoável.
>
> **Vocabulário fechado de Status:** `Ready` · `Em implementação` · `Feito`.
> Status fora dessa lista quebra a leitura do documento.
>
> As histórias **W (Won't have)** não entram nesta tabela — elas vão para a
> seção 6.

---

### US01 — [Título curto da história] · `M` · Status: `Ready`

**Como** [tipo de usuário], **eu quero** [ação] **para que** [benefício].

**Critérios de aceite:**
- [ ] **Dado** [contexto], **quando** [ação], **então** [resultado observável].
- [ ] **Dado** [contexto de erro], **quando** [ação], **então** [mensagem/estado].
- [ ] [Estado vazio, se a tela lista coisas: o que aparece quando não há nada?]

**Regras relacionadas:** [RN01, RN03]

---

### US02 — Ex: Reservar uma sala · `M` · Status: `Ready`

**Como** usuário autenticado, **eu quero** reservar uma sala em um horário
**para que** eu tenha o espaço garantido quando chegar.

**Critérios de aceite:**
- [ ] **Dado** que a sala está livre no intervalo escolhido, **quando** eu
      confirmo a reserva, **então** ela aparece em "Minhas reservas" com o
      horário escolhido.
- [ ] **Dado** que já existe reserva sobreposta, **quando** eu confirmo,
      **então** vejo a mensagem "Esta sala já está reservada neste horário" e
      nada é gravado.
- [ ] **Dado** que não tenho nenhuma reserva, **quando** abro "Minhas reservas",
      **então** vejo o estado vazio com um convite para reservar.

**Regras relacionadas:** RN01, RN02

---

> 📋 **Resumo do escopo** — preencha conforme as histórias forem escritas.

| ID | História | MoSCoW | Status |
| :--- | :--- | :---: | :--- |
| Ex: US02 | Reservar uma sala | M | Ready |
| Ex: US03 | Cancelar a própria reserva | M | Ready |
| Ex: US07 | Receber lembrete por e-mail | C | Ready |

---

## 🛡️ 5. Regras de Negócio (Constraints)

> Restrição que vale **independente da tela**. Regra tem ID porque é citada no
> código, no commit e na política de RLS.
>
> Se a regra só existe numa tela, ela é critério de aceite (seção 4), não RN.

| ID | Regra | Nasce de |
| :--- | :--- | :--- |
| Ex: RN01 | Duas reservas da mesma sala não podem se sobrepor no tempo | US02 |
| Ex: RN02 | Reserva tem duração mínima de 30 min e máxima de 4 h | US02 |
| Ex: RN03 | Só o dono da reserva ou um `admin` pode cancelá-la | US03 |

---

## 🚫 6. Fora de Escopo (Non-goals)

> Aqui moram os **W (Won't have)** do MoSCoW. Escrever o que **não** será feito
> é o que impede o projeto de crescer sem controle — e impede a IA de "ajudar"
> construindo o que ninguém pediu.

| Não faremos nesta versão | Por quê |
| :--- | :--- |
| Ex: Pagamento de reserva | Não há cobrança no modelo atual |
| Ex: Aplicativo nativo | O escopo é web responsiva |

---

## ⚙️ 7. Requisitos Não Funcionais (Qualidade)

> **Requisito não funcional sem número não é requisito, é torcida.** "O sistema
> deve ser rápido" não pode ser verificado nem por você nem pela IA.

| # | Requisito | Como verificar |
| :--- | :--- | :--- |
| RNF01 | Ex: Mobile-first: toda tela funciona a partir de 360 px de largura | DevTools em 360 px, sem rolagem horizontal |
| RNF02 | Ex: Contraste mínimo AA (WCAG 2.2) em texto e botões | Lighthouse / axe DevTools |
| RNF03 | Ex: Toda ação do usuário dá retorno visual em até 1 s | Observação manual no fluxo principal |
| RNF04 | **Toda tela que busca dados declara três estados: carregando, vazio e erro** | Revisão das telas — nenhuma cai em branco |
| RNF05 | Ex: Navegação completa por teclado nos formulários | Percorrer o fluxo só com Tab/Enter |

> 💡 **O RNF04 não é enfeite.** É a instrução mais barata que existe para evitar
> que o agente entregue só o caminho feliz.

---

## 🛠️ 8. Histórico

| Data | Versão | O que mudou |
| :--- | :--- | :--- |
| Ex: 2026-03-10 | 1.0.0 | Versão inicial: US01–US08, RN01–RN03 |

> Documento vivo. Mudou a regra? **Atualize aqui e registre a linha** — PRD
> desatualizado é pior que PRD inexistente, porque a IA confia nele.
