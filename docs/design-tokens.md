# 🎨 Design Tokens — Revela

> Tokens visuais base do projeto. Devem ser refletidos no `tailwind.config` e respeitados por todos os componentes de `shared/`.

---

## 🔗 Protótipos Navegáveis

| Artefato | Link |
| :--- | :--- |
| Stitch (protótipo navegável) | https://stitch.withgoogle.com/projects/15011456379193222865 |
| Figma (mapa de componentes) | https://www.figma.com/design/TCMau7Qn4SifjXr0yreL2q/Revela?node-id=1-2545&t=lOVN5hogvi0sRVKm-1 |

---

## 🔤 Tipografia

**Família:** `Plus Jakarta Sans`, sans-serif (Google Fonts)

| Peso | Valor | Nome semântico | Aplicação |
| :--- | :--- | :--- | :--- |
| 800 | Extra Bold | `--font-weight-display` | Títulos de destaque e banners |
| 700 | Bold | `--font-weight-heading` | Títulos de seções, participantes, métricas |
| 600 | Semi Bold | `--font-weight-button` | Botões primários (CTAs) e badges |
| 500 | Medium | `--font-weight-label` | Menus, rótulos, legendas |
| 400 | Regular | `--font-weight-body` | Textos corridos, placeholders, descrições |

---

## 🎨 Paleta de Cores (Tailwind `@theme`)

| Token semântico | Valor | Uso |
| :--- | :--- | :--- |
| `--color-primary` | `#7D1242` | Cor primária (Marsala/Vinho) — CTAs, links, marca |
| `--color-primary-gradient` | `linear-gradient(135deg, #5A002C, #7D1242, #9D1755, #A21CAF)` | Hero & Login |
| `--color-accent` | `#FBCFE8` | Acento suave (Pink Revelação) — detalhes decorativos |
| `--color-surface` | `#FAF6F8` | Superfície / fundo do app |
| `--color-card` | `#FFFFFF` | Cards & modais |
| `--color-card-border` | `#F3E8EE` | Borda de cards/modais |
| `--color-text-primary` | `#211319` | Texto primário / títulos |
| `--color-text-secondary` | `#66555C` | Texto secundário / muted |
| `--color-status-confirmed-bg` | `#ECFDF5` | Status confirmado — fundo |
| `--color-status-confirmed-text` | `#059669` | Status confirmado — texto |
| `--color-status-pending-bg` | `#FFFBEB` | Status pendente — fundo |
| `--color-status-pending-text` | `#D97706` | Status pendente — texto |
| `--color-status-restriction-bg` | `#FFF1F2` | Status restrição — fundo |
| `--color-status-restriction-text` | `#BE123C` | Status restrição — texto |

---

## 📐 Espaçamento & Formas

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--radius-card` | `16px` (`rounded-2xl`) | Cards & Modais |
| `--radius-button` | `12px` (`rounded-xl`) | Botões & Inputs |
| `--radius-full` | `9999px` (`rounded-full`) | Badges & Avatares |
| `--spacing-scale` | `4, 8, 12, 16, 24, 32, 40, 48, 64` | Escala base (mobile-first) |

---

## 🔘 Estados de Botão (Primário)

| Estado | Fundo | Texto | Borda | Observação |
| :--- | :--- | :--- | :--- | :--- |
| Default | `#7D1242` (`--color-primary`) | `#FFFFFF` | — | — |
| Hover | `#5A002C` (90% opacity) | `#FFFFFF` | — | Tom mais escuro |
| Focus | `#7D1242` | `#FFFFFF` | `2px solid #FBCFE8` | Anel de foco acessível |
| Disabled | `#F3E8EE` (`--color-card-border`) | `#66555C` (`--color-text-secondary`) | — | Não interativo |
| Loading | `#7D1242` | Spinner branco | — | `cursor: wait` |

---

## 📱 Mobile-First & Breakpoints

| Breakpoint | Valor | Prefixo Tailwind | Regra |
| :--- | :--- | :--- | :--- |
| Mobile (base) | `< 640px` | (nenhum) | Layout nasce aqui: coluna única + Bottom Nav |
| `sm` | `640px` | `sm:` | Pequenos ajustes |
| `md` | `768px` | `md:` | Tablet — 2 colunas onde couber |
| `lg` | `1024px` | `lg:` | Desktop — Sidebar fixa + 2/3 colunas |
| `xl` | `1280px` | `xl:` | Telas largas — max-width container |

---

## 📦 Identidade PWA (`manifest.webmanifest`)

| Campo | Valor |
| :--- | :--- |
| `name` | Revela |
| `short_name` | Revela |
| `theme_color` | `#7D1242` |
| `background_color` | `#FAF6F8` |
| `display` | `standalone` |
| `icons` | SVG presente estilizado (`🎁`) nas cores Marsala (`#7D1242`) e Pink (`#FBCFE8`) — múltiplos tamanhos (72, 96, 128, 144, 152, 192, 384, 512) |
| `start_url` | `/` |
| `scope` | `/` |

---

## 📴 Comportamento Offline

**Estratégia:** Cache-First (Service Worker)

**Tela informativa customizada:**
> *"Você está offline. Os seus dados do amigo secreto e da lista de desejos gravados anteriormente continuam disponíveis."*

---

## ⚠️ Ponto de Desistência — US06 (Realizar o Sorteio)

**Ponto de hesitação:** Organizador teme acionar o sorteio por engano, não saber quantos participantes confirmaram ou se exclusões (US08) estão ativas.

**Mitigação (vira regra de negócio / critério de aceite no `prd.md`):**

1. Ação de sorteio **obrigatoriamente abre Modal de Confirmação e Validação Pré-Sorteio**.
2. Modal exibe resumo:
   - Quantidade de membros confirmados vs. pendentes
   - Total de regras de exclusão ativas
3. Aviso de privacidade no modal:
   > *"O resultado será mantido em segredo e só será revelado a cada participante individualmente quando ele acessar o aplicativo."*
4. Sorteio só efetivado após **dupla confirmação** no modal.

> 📝 **Ação necessária:** Atualizar `docs/prd.md` (US06) com este critério de aceite / regra de negócio, com seu OK.

---

## 📋 Histórico

| Data | Versão | O que mudou |
| :--- | :---: | :--- |
| 2026-10-12 | 1.0.0 | Tokens iniciais: tipografia, paleta, formas, estados, breakpoints, PWA, ponto de desistência US06. |
