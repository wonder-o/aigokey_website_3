<template>
  <div ref="menuRef" class="language-menu">
    <button
      class="language-trigger"
      type="button"
      :aria-label="currentLanguageLabel"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
      @keydown.escape="open = false"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.2 2.4 3.4 5.4 3.4 9s-1.2 6.6-3.4 9M12 3c-2.2 2.4-3.4 5.4-3.4 9s1.2 6.6 3.4 9" />
      </svg>
      <span>{{ currentLanguageLabel }}</span>
      <svg class="chevron" :class="{ open }" aria-hidden="true" viewBox="0 0 24 24">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div v-if="open" class="language-popover" role="menu">
      <button
        v-for="item in languageOptions"
        :key="item.code"
        class="language-option"
        :class="{ selected: item.code === lang }"
        type="button"
        role="menuitemradio"
        :aria-checked="item.code === lang"
        @click="choose(item.code)"
      >
        <span>{{ item.label }}</span>
        <span v-if="item.code === lang" class="check">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n, type Language } from '@/composables/useI18n'

const open = ref(false)
const menuRef = ref<HTMLElement | null>(null)
const { lang, languageOptions, currentLanguageLabel, setLanguage } = useI18n()

function choose(language: Language) {
  setLanguage(language)
  open.value = false
}

function closeOnOutsideClick(event: PointerEvent) {
  if (!open.value) return
  const target = event.target
  if (target instanceof Node && menuRef.value?.contains(target)) return
  open.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOnOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeOnOutsideClick)
})
</script>

<style scoped>
.language-menu {
  position: relative;
}

.language-trigger {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.language-trigger svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.language-trigger .chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.16s ease;
}

.language-trigger .chevron.open {
  transform: rotate(180deg);
}

.language-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 40;
  width: 174px;
  padding: 8px;
  border: 1px solid #dce5ec;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 16px 36px rgba(17, 27, 36, 0.14);
}

.language-option {
  width: 100%;
  min-height: 36px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  color: #111b24;
  background: transparent;
  font: inherit;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.language-option:hover {
  background: #f2f7fb;
}

.language-option.selected {
  color: #354fe7;
}

.check {
  color: #354fe7;
  font-weight: 900;
}

@media (max-width: 720px) {
  .language-popover {
    left: 0;
    right: auto;
    width: min(220px, 90vw);
  }
}
</style>
