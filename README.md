# DefiniPortfólio

Portal de portfólio com dois projetos integrados: um site de restaurante italiano (**Italiana Food**) com console de API interativo, e um site de barbearia (**Telasko**) com formulário de agendamento.

---

## 📁 Estrutura de Pastas

```
definiportifolio/
├── index.html              ← Portal principal
├── style.css
├── italiana-food/
│   ├── index.html          ← Tela inicial do restaurante
│   ├── style.css
│   ├── app.js
│   └── menu.json           ← Dados do cardápio (mock)
└── telasko/
    ├── index.html          ← Tela inicial da barbearia
    ├── style.css
    └── app.js
```

---

## 🍕 Italiana Food

Site de um restaurante de gastronomia italiana com:

- **Hero** com chamada para o cardápio
- **Cardápio dinâmico** com filtro por categoria (Entradas, Pizzas, Massas, Sobremesas) carregado via `menu.json`
- **Console da API** interativo — simula requisições REST client-side:
  | Endpoint | Descrição |
  |---|---|
  | `GET /menu` | Retorna todos os pratos |
  | `GET /menu?category=massas` | Filtra por categoria |
  | `GET /menu/:id` | Busca prato por ID |
  | `POST /order` | Cria um pedido com cálculo de total |

---

## 💈 Telasko Barbearia

Site de barbearia moderna com:

- **Hero** com chamada para agendamento  
- **Grade de serviços** com preços (Corte, Barba, Combo, VIP)
- **Formulário de agendamento** com validação de data mínima e exibição de comprovante de reserva após envio

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, flexbox, animações)
- JavaScript Vanilla (sem frameworks)
- Google Fonts (Playfair Display + Instrument Sans)

---

## ▶️ Como rodar localmente

**Opção 1 — Node.js (já incluso no projeto):**

```bash
node serve.js
# Acesse: http://localhost:8000
```

**Opção 2 — VS Code Live Server:**  
Abrir `index.html` com a extensão Live Server.

---

## 🚀 Deploy

Acesse [netlify.com/drop](https://app.netlify.com/drop) e arraste a pasta `definiportifolio/` inteira para o campo de upload. O link público será gerado em segundos.

---

## 👤 Autor  
felipe
Projeto acadêmico desenvolvido em 2026 com HTML, CSS e JavaScript. 

## ORIENTADOR 
HUDSON N
