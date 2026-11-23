---

## Parecer de Conformidade — Tarefa 3 (CA3)

**Veredito: APROVADO**

O diff implementa corretamente o formulário de login reativo com validações de campo e mensagens de erro por campo, e o teste automatizado valida o critério de aceite CA3.

### Evidências de conformidade

| Requisito (CA3 / Tarefa 3) | Implementação | Arquivo:linha |
|---|---|---|
| Formulário reativo com e-mail (`required` + `email`) e senha (`required`) | `FormGroup` com dois `FormControl` usando `Validators.required` e `Validators.email` | `login-page.ts:22–32` |
| Mensagem de erro **sob cada campo** inválido | Template usa `@if (shouldShowError('email'))` e `@if (shouldShowError('password'))` renderizando `<p>` logo após cada `<input>` | `login-page.html:23–24`, `login-page.html:35–36` |
| `shouldShowError` exibe erro ao submeter ou ao tocar no campo | `control.invalid && (control.touched || this.submitted())` | `login-page.ts:45–47` |
| Teste prova que **nenhuma requisição é enviada** ao submeter inválido | `httpTesting.expectNone(() => true)` após clique no botão | `login-page.spec.ts:48` |
| Teste cobre e-mail inválido (`'invalido'`) e senha vazia | `emailInput.value = 'invalido'`, `passwordInput.value = ''` | `login-page.spec.ts:33–34` |

### Observações (não bloqueantes)

- O template já inclui blocos para CA2 (`invalidCredentials`) e CA4 (`serverError`); isso é antecipação de tarefas futuras e não fere o escopo da Tarefa 3.
- O método `onSubmit()` retorna cedo se `loginForm.invalid` — a integração com `AuthRepository.signIn` virá na Tarefa 4 (CA1), conforme planejado.

### Conclusão

Todos os critérios da Tarefa 3 / CA3 estão atendidos e testados. **Nenhum apontamento bloqueante.**