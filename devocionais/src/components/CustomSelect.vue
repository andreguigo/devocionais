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