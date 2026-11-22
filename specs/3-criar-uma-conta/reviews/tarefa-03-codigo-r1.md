# Parecer de Código — Tarefa 3

**Veredito:** APROVADO

## Escopo inspecionado
- Diff: `git diff 1ff6f960a32b5e4e613651c4da0397f4a1a8dfbe` (3 arquivos: `register-page.html`, `register-page.spec.ts` novo, `register-page.ts`).
- Testes executados: `npm run test -w apps/web -- --watch=false` em `C:\Users\meryh\revela` — **2 arquivos, 4 testes, todos passando**.
- Referências: `docs/architecture.md`, `.agents/rules/01-angular-strict-rules.md`, `docs/design-tokens.md`, `specs/3-criar-uma-conta/spec.md` (CA3), `specs/3-criar-uma-conta/plan.md` (Tarefa 3, fronteira CA4).

## Aderência verificada
- **CA3 coberto:** submissão com nome `< 3`, e-mail inválido, senha `< 6` e confirmação vazia exibe mensagem sob cada campo inválido; `onSubmit()` retorna sem enviar quando `form.invalid`; teste afirma `httpTesting.expectNone(() => true)`.
- **Fronteira CA4 respeitada:** `confirmPassword` usa apenas `Validators.required`; não há validação de igualdade senha/confirmação nem mensagem "As senhas não coincidem" antecipada.
- **Angular/regras:** standalone sem `standalone: true`; `@if` no template; estado local com `signal()`; Reactive Forms (`FormGroup`, `FormControl`, `Validators`); `inject()`/construtor não usados; sem `@Input/@Output`, sem `*ngIf/*ngFor`, sem `any`, sem `HttpClient`/SDK no componente; nomeação concisa (`register-page.ts`, `RegisterPage`).
- **Estilo/tokens:** cores/fontes/forma via tokens/utilitários Tailwind do projeto (`bg-card`, `border-card-border`, `text-text-primary`, `text-status-restriction-text`, `bg-primary`, `font-heading`, `font-label`, `font-button`, `rounded-card`, `rounded-button`); sem hex, sem paleta solta, sem `style`, sem CSS por componente.
- **Arquitetura:** componente permanece em `features/auth/pages/register-page`; sem model em feature, sem repository/HTTP direto, sem import cross-feature.

## Apontamentos (bloqueiam)
Nenhum.

## Sugestões (não bloqueiam)
- **Cobertura "vazio" explícita no teste:** o CA3 inclui "inválidos ou vazios"; o teste cobre valores inválidos e confirmação vazia, mas não exercita nome/e-mail/senha vazios explicitamente. Como `Validators.required` já cobre o caso, não bloqueia; vale adicionar um caso/variante para fechar a redação literal do critério.
- **BOM no arquivo de spec de teste:** `register-page.spec.ts` foi adicionado com caractere BOM no início (`﻿import...` no diff). Geralmente inofensivo, mas pode gerar ruído em diffs/ferramentas; remover o BOM padroniza a codificação.
- **Setup de teste mínimo:** `provideHttpClient()`/`provideHttpClientTesting()` são úteis para o `expectNone`, mas o componente não depende de HTTP. Manter é aceitável; se quiser reduzir acoplamento do teste ao setup, documente a intenção ou isole em helper quando houver mais testes de formulário.

## Observações fora do escopo deste diff
- A mensagem de erro de `confirmPassword` ("Confirmação de senha é obrigatória.") está adequada para CA3/required; a Tarefa 4 precisará introduzir a validação de igualdade e a mensagem "As senhas não coincidem" conforme CA4, cuidando para não conflitar com o estado required.
- Acessibilidade dos erros pode ser reforçada futuramente com `aria-invalid` e `aria-describedby` ligando input e mensagem; não exigido pela tarefa/CA3 atual.
