---
issue: 4
status: aprovada
---

# Especificação da Feature — US02: Fazer login

## 1. O problema
Quem já criou uma conta no Revela não consegue se autenticar novamente — a tela de login é apenas um stub sem formulário nem lógica.

## 2. A história
Como usuário cadastrado, eu quero fazer login para que eu possa acessar meus grupos.

## 3. Critérios de aceite

CA1: Dado que preencho e-mail e senha corretos (e-mail existente no sistema, comparação case-insensitive e ignorando espaços nas pontas, e senha idêntica à armazenada), quando clico no botão "Entrar", então fico autenticado e sou redirecionado para /groups.

CA2: Dado que informo um e-mail inexistente ou uma senha que não corresponde à do cadastro, quando clico no botão "Entrar", então vejo a mensagem "E-mail ou senha inválidos" abaixo do formulário, permaneço na tela de login e todos os dados digitados são preservados nos campos.

CA3: Dado que algum campo está vazio ou inválido (e-mail fora do padrão), quando clico em "Entrar", então uma mensagem de erro sob cada campo inválido é exibida e nenhuma requisição é enviada.

CA4: Dado que o servidor está fora do ar, ocorre erro 500 ou timeout, quando confirmo o login, então a mensagem "Não foi possível conectar ao servidor. Tente novamente." é exibida no topo do formulário, todos os dados digitados são preservados nos campos, nada é gravado e o botão volta ao estado normal habilitado.

CA5: Dado que confirmo o login com dados válidos, quando a requisição é iniciada e aguarda resposta, então o botão "Entrar" fica desabilitado contra novos cliques e exatamente uma única requisição é enviada.

CA6: Dado que a aplicação é aberta em /login, quando acesso a tela, então a tela de login aparece entre o cabeçalho e o rodapé.

CA7: Dado que estou na tela de login, quando toco em "Não tem conta? Criar conta", então sou levado para a tela de cadastro (/register).

## 4. Fora de escopo
- Recuperação e redefinição de senha esquecida.
- Login social / OAuth (Google, GitHub, etc.).
- "Lembrar de mim" ou persistência de sessão em localStorage (sessão vive apenas no signal em memória).
- Navegação condicional no header/drawer (mostrar "Sair" quando logado). Isso será feito quando houver história que exija.
- Bloqueio de conta após tentativas falhas.
- Validação de força de senha no login — a validação de comprimento mínimo é do cadastro (US01), não do login.

## 5. Assume que
- Assume que 1 (Comparação de senha em texto puro no mock): A comparação da senha em texto puro é uma simplificação temporária para a Entrega 2, usando json-server. A Issue #26 substituirá por Supabase Auth. // TODO #26: Substituir comparação de senha em texto puro por Supabase Auth.
- Assume que 2 (Dados vindos do json-server, desfeito pela #26): Os dados são provenientes de um servidor falso local (json-server), desfeito pela Issue #26. // TODO #26: Substituir json-server pelo BaaS real.
- Assume que 3 (Busca de usuário por e-mail via GET /users): O AuthRepository buscará o usuário correspondente via GET /users (mesma abordagem da US01) e comparará a senha localmente no frontend. Isso será substituído por um endpoint real de autenticação na Issue #26.
- Assume que 4 (AuthSession já existe): O serviço AuthSession (com signal authenticatedUser) já foi criado pela US01 e será reutilizado para armazenar o usuário autenticado.

## 6. Abandono no meio
Quando o usuário sai da tela de login sem confirmar, nenhum dado é salvo no servidor. Fechar o navegador ou atualizar a página não persiste os dados preenchidos.

## 7. Dúvidas em aberto
Nenhuma.
