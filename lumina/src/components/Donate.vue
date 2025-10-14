<template>
  <div class="doacao-container">
    <h2>Ajude nossa missão ❤️</h2>
    <p>O seu apoio ajuda a iluminar o caminho de centenas de pessoas com uma reflexão de Fé e Esperança todos os dias.</p>
    
    <div class="valores">
      <button
        v-for="v in valoresPredefinidos"
        :key="v"
        class="valor-btn"
        :class="{ ativo: valorSelecionado === v }"
        @click="selecionarValor(v)"
      >
        R$ {{ v }}
      </button>
    </div>

    <button class="botao-googlepay" @click="abrirModal">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icone">
        <path
          d="M21.8 10.2h-1.04v-.05h-8.26v3.7h4.84a4.1 4.1 0 0 1-1.78 2.7l2.87 2.23c1.67-1.54 2.63-3.8 2.63-6.3 0-.48-.04-.95-.12-1.38z"
          fill="#4285F4"
        />
        <path
          d="M12.5 22c2.43 0 4.47-.8 5.96-2.17l-2.87-2.23c-.8.54-1.83.86-3.09.86a5.35 5.35 0 0 1-5.06-3.65l-3 2.3A8.97 8.97 0 0 0 12.5 22z"
          fill="#34A853"
        />
        <path
          d="M7.44 14.8a5.38 5.38 0 0 1-.3-1.8c0-.62.11-1.22.3-1.8l-3.02-2.3a8.97 8.97 0 0 0 0 8.18l3.02-2.3z"
          fill="#FBBC05"
        />
        <path
          d="M12.5 6.1a4.9 4.9 0 0 1 3.46 1.35l2.58-2.56A8.66 8.66 0 0 0 12.5 2a8.97 8.97 0 0 0-8.62 6.9l3.02 2.3a5.35 5.35 0 0 1 5.06-3.1z"
          fill="#EA4335"
        />
      </svg>
      <span>Doar com Google Pay</span>
    </button>
    
    <div v-if="mostrarModal" class="overlay" @click.self="fecharModal">
      <div class="modal">
        <iframe
          :src="linkComValor"
          frameborder="0"
          allow="payment *"
          class="iframe"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DoacaoModalStripe",
  data() {
    return {
      mostrarModal: false,
      valoresPredefinidos: [9, 19, 29],
      valorSelecionado: null,
      paymentLinkBase: "https://donate.stripe.com/9B6eVdfJV41c0luato9bO01",
    };
  },
  computed: {
    valorFinal() {
      return this.valorSelecionado || Number(this.valorPersonalizado) || 0;
    },
    linkComValor() {
      if (!this.valorFinal) return this.paymentLinkBase;
      // Stripe permite parâmetros adicionais, como client_reference_id ou metadata
      return `${this.paymentLinkBase}?client_reference_id=doacao_${this.valorFinal}`;
    },
  },
  methods: {
    selecionarValor(v) {
      this.valorSelecionado = v;
    },
    abrirModal() {
      if (!this.valorFinal) {
        alert("Escolha um valor para doar 🙏");
        return;
      }
      this.mostrarModal = true;
    },
    fecharModal() {
      this.mostrarModal = false;
    },
  },
};
</script>

<style scoped>
.doacao-container {
  max-width: 390px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 1rem;
}.valores {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}
.valor-btn {
  background: #fef3c6;
  border: 1px solid #310a26;
  color: #310a26;
  padding: 0.25rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}
.valor-btn:hover {
  background: #310a26;
  color: #fef3c6;
}
.valor-btn.ativo {
  background: #310a26;
  color: #fef3c6;
}
.botao-googlepay {
  background-color: #310a26;
  color: #fef3c6;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 1rem;
}
.botao-googlepay:hover {
  background-color: #222;
}
.icone {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
}
/* Modal */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal {
  background: #fef3c6;
  border-radius: 12px;
  width: 400px;
  height: 600px;
  overflow: hidden;
  display: flex;
}
.iframe {
  border: none;
  width: 100%;
  height: 100%;
}
</style>