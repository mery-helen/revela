---

## PARECER DE REVISÃO — Tarefa 3 (LoginPage: formulário + validações de campo)

### Veredito: **APROVADO** ✅

A implementação atende ao escopo da **Tarefa 3** (CA3): formulário reativo com e-mail/senha, validações por campo via `shouldShowError`, signal `submitted`, mensagens de erro exibidas sob cada campo inválido e **nenhuma requisição enviada** quando o formulário está inválido. Os testes passam (20/20) e não há violações das regras estritas do Angular nem da arquitetura feature-driven.

---

### Apontamentos BLOQUEANTES
**Nenhum.** O código cumpre o critério CA3 e respeita todas as regras obrigatórias.

---

### Sugestões NÃO BLOQUEANTES (para próximas tarefas / qualidade)

| # | Arquivo:Linha | Observação |
|---|---------------|------------|
| 1 | `login-page.ts:22-25` | Signals `invalidCredentials` e `serverError` declaradas mas não usadas no `onSubmit()` atual. Serão necessárias nas Tarefas 5–6; considerar remover ou comentar até lá para evitar *dead code*. |
| 2 | `login-page.ts:13-15` | `authSession` e `router` injetados mas não utilizados ainda. Serão usados na Tarefa 4; mesmo comentário acima. |
| 3 | `login-page.ts:36-47` | `onSubmit()` trata só o caso inválido; quando válido, retorna silenciosamente. Sugerir adicionar `// TODO Tarefa 4: chamar authRepository.signIn…` para clareza. |
| 4 | `login-page.spec.ts` | Apenas 1 teste (CA3). `RegisterPage` tem 7 testes cobrindo CA1–CA6/CA9. Expandir à medida que Tarefas 4–7 forem implementadas. |
| 5 | `login-page.ts:49`, `login-page.html:58`, `login-page.spec.ts:58` | Falta *newline* no final dos três arquivos (padrão POSIX/ESLint). |
| 6 | `login-page.html:4-12` | Blocos `@if (serverError())` e `@if (invalidCredentials())` renderizam mensagens que hoje nunca aparecem (signals nunca viram `true`). Manter alinhado ao `RegisterPage` está correto; apenas confirmar que Tarefas 5–6 vão setá-las. |

---

### Conformidade verificada (checklist)

- [x] **Standalone** — `imports: [ReactiveFormsModule, RouterLink]`, sem `NgModule`  
- [x] **Control flow** — `@if` / `@for` (não há `*ngIf`/`*ngFor`)  
- [x] **Estado** — `signal()` para `submitted`, `invalidCredentials`, `serverError`, `isSubmitting`  
- [x] **RxJS na fronteira** — componente não usa RxJS; `AuthRepository` encapsula `HttpClient`  
- [x] **Injeção** — `inject(AuthRepository)`, `inject(AuthSession)`, `inject(Router)`  
- [x] **Reactive Forms** — `FormGroup` + `FormControl` + `Validators` + `nonNullable: true`  
- [x] **Tipagem estrita** — sem `any`; parâmetro `'email' \| 'password'` em `shouldShowError`  
- [x] **Nomes concisos** — `login-page.ts` / classe `LoginPage` (sem sufixo `Component`)  
- [x] **Design tokens** — `bg-card`, `text-text-primary`, `rounded-button`, `text-status-restriction-text`, etc.  
- [x] **Sem CSS por componente** — apenas classes utilitárias Tailwind no template  
- [x] **Estrutura feature-driven** — `features/auth/pages/login-page/`  
- [x] **Repository pattern** — componente só chama `AuthRepository` (ainda não invocado, mas injetado)  
- [x] **Consistência com `RegisterPage`** — mesmo padrão de `FormGroup`, `shouldShowError`, `submitted` signal, `data-testid`, estrutura de template  

---

**Conclusão:** a entrega da Tarefa 3 está **aprovada**. Os itens acima são sugestões de limpeza/preparação para as tarefas subsequentes (4–7) e não impedem o merge.