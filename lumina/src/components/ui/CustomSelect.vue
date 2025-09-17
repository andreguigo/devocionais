<template>
  <div class="custom-select">
    <div class="selected" @click="toggleSelect">
      {{ selectedLabel }}
    </div>
    
    <div v-if="isOpen" class="options">
      <div 
        v-for="option in options" 
        :key="option.value"
        :class="{ active: option.value === modelValue }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    selectedLabel() {
      const option = this.options.find(o => o.value === this.modelValue)
      return option ? option.label : "Selecione..."
    }
  },
  methods: {
    toggleSelect() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value)
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.custom-select {
  position: relative;
  max-width: 100%;
}
.selected {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--secondary-foreground);
  border: 1px solid var(--border);
  border-radius: 5px;
  color: var(--color-light);
  font-family: var(--font);
  font-size: 1rem;
  transition: background 0.3s;
}
.selected:hover {
  background: var(--primary);
}
.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  z-index: 10;
  background: var(--secondary-foreground);
  color: var(--color-light);
  padding: 0.75rem;
  outline: none !important;
  gap: 20px;
  border: hidden;
  border-radius: 5px;
}
.options div {
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 5px;
}
.options div:hover {
  background: var(--primary);
  color: var(--color-light);
  border-radius: 5px;
}
.options div.active {
  background: var(--primary);
  color: var(--color-light);
}
</style>