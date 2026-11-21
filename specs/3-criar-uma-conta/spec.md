---
issue: 3
status: rascunho
---

# Especificação da Feature — US01: Criar uma conta

## 1. O problema
Quem quer organizar ou participar de um amigo secreto não tem como se identificar no app.

## 2. A história
Como visitante, eu quero criar uma conta para que eu possa criar ou participar de grupos de amigo secreto.

## 3. Critérios de aceite

CA1: Dado que preencho o formulário com nome tendo no mínimo 3 caracteres, e-mail válido e senha com no mínimo 6 caracteres (confirmação idêntica), quando clico no botão "Criar conta", então a conta é criada, a pessoa fica autenticada e é redirecionada para a tela de grupos.

CA2: Dado que informo um e-mail já cadastrado no sistema (comparação case-insensitive, ignorando espaços nas pontas), quando confirmo o cadastro, então a mensagem "Este e-mail já está em uso" é exibida e nenhum registro é gravado.

CA3: Dado que algum campo está inválido ou vazio (nome com menos de 3 caracteres, e-mail fora do padrão ou senha com menos de 6 caracteres), quando clico em "Criar conta", então uma mensagem de erro sob cada campo inválido é exibida e nenhuma requisição é enviada.

CA4: Dado que o campo "Confirmar senha" tem valor diferente do campo "Senha", quando tento submeter o formulário, então a mensagem "As senhas não coincidem" é exibida abaixo do campo de confirmação.

CA5: Dado que o servidor está fora do ar, ocorre erro 500 ou timeout, quando confirmo o cadastro, então a mensagem "Não foi possível conectar ao servidor. Tente novamente." é exibida no topo do formulário, todos os dados digitados são preservados nos campos, nada é gravado e o botão volta ao estado normal habilitado.

CA6: Dado que confirmo o cadastro com dados válidos, quando a requisição é iniciada e aguarda resposta, então o botão "Criar conta" fica desabilitado contra novos cliques e exatamente uma única requisição é enviada.

CA7: Dado que a aplicação é aberta em /register, quando acesso a tela, então a tela de cadastro aparece entre o cabeçalho e o rodapé.

CA8: Dado que a aplicação está no celular, quando toco no botão ☰, então a gaveta abre com os links "Criar conta" e "Entrar".

CA8b: Dado que a gaveta está aberta, quando toco em um link ("Criar conta" ou "Entrar"), então a gaveta fecha e a tela correspondente aparece.

CA9: Dado que estou na tela de cadastro, quando toco em 'Já tem uma conta? Faça login', então sou levada para a tela de login.

## 4. Fora de escopo
- Implementação da tela e lógica de Login (US02).
- Recuperação e redefinição de senha esquecida.
- Confirmação de e-mail por envio de token ou link de ativação externo.
- Login social / OAuth (Google, GitHub, etc.).
- Regras adicionais de força de senha além do comprimento mínimo de 6 caracteres (ex.: letras maiúsculas, dígitos e símbolos não são bloqueantes no MVP).
- Implementação das páginas de destino de outras histórias além de /register e o stub de /groups.
- Rota de login.
- Navegação no desktop: opção A, links na barra superior, sem menu lateral.

## 5. Assume que
- Assume que 1 (Armazenamento de senha no mock): A gravação da senha em texto puro no mock local é uma simplificação temporária para a Entrega 2, viabilizando o teste do fluxo de login (US02) antes da migração para o BaaS real. Issue #26 (Substituir mock de autenticação e dados pelo BaaS real (Supabase)). // TODO #26: Substituir json-server pelo BaaS real.
- Assume que 2 (Dados vindos do json-server, desfeito pela #26): Os dados são provenientes de um servidor falso local (json-server), desfeito pela Issue #26. // TODO #26: Substituir armazenamento de senha em texto puro por Supabase Auth.
- Assume que 3 (Tela /groups é só um stub): A tela de grupos (destino do redirecionamento) ainda não existe: será um stub mínimo. Issue #5 (US03). // TODO #5: Implementar tela de grupos com BaaS.
- Assume que 4 (Tela de login ainda não existe): O link e a opção "Entrar" do menu apontam para uma rota sem tela. Issue #4 (US02). // TODO #4: Implementar tela de login com BaaS.

## 6. Abandono no meio
Quando o usuário sai da tela de cadastro sem confirmar, nenhum dado é salvo no servidor. Fechar o navegador ou atualizar a página não persiste os dados preenchidos.

## 7. Dúvidas em aberto
Nenhuma.