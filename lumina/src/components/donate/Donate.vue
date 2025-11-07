<template>
  <div class="donate-container">
    <h3>Ajude nossa missão <span class="pi pi-heart-fill"></span></h3>
    <p>O seu apoio ajuda a iluminar o caminho de centenas de pessoas com uma reflexão de Fé e Esperança todos os dias.</p>
    <div class="values">
      <button
        v-for="v in predefinedValues"
        :key="v.value"
        class="value-btn"
        :class="{ active: selectedValue === v.value }"
        @click="selectValue(v)"
      >
        R$ {{ v.value }}
      </button>
    </div>
    <button class="donate-btn" @click="confirmDonation">
      <span>Contribuir com R$ {{ selectedValue }}/mês</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Donate",
  data() {
    return {
      selectedValue: '9,90',
      predefinedValues: [
        { value: '4,90', link: `${import.meta.env.VITE_DONATE_LINK_MIN}` },
        { value: '9,90', link: `${import.meta.env.VITE_DONATE_LINK_MED}` },
        { value: '19,90', link: `${import.meta.env.VITE_DONATE_LINK_MAX}` },
      ]
    };
  },
  computed: {
    selectedLink() {
      const found = this.predefinedValues.find(
        (v) => v.value === this.selectedValue
      );
      if (found) return found.link;
      return null;
    },
  },
  methods: {
    selectValue(v) {
      this.selectedValue = v.value;
    },
    confirmDonation() {
      if (!this.selectedLink) {
        alert("Erro: link de doação não encontrado.");
        return;
      }
      window.open(this.selectedLink, "_blank");
    },
  },
};
</script>

<style scoped>
@import 'primeicons/primeicons.css';
.donate-container {
  max-width: 390px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 1rem;
}
.values {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}
.value-btn {
  border: 1px solid #f8db7e;
  background: #fef3c6;
  font-size: small;
  padding: 0.5rem 0.75rem;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.2s;
  color: #6f1b2c;
}
.value-btn:hover {
  background: #fcebb0;
}
.value-btn.active {
  background: #f8db7e;
}
.donate-btn {
  background-color: #6f1b2c;
  color: #fef3c6;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.9rem;
}
.donate-btn:hover {
  background-color: #310a26;
}
</style>
