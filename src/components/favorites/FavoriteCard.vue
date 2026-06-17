<!-- Tarjeta de favorito: titulo, notas editables, rating y boton eliminar -->
 <script setup>
defineProps({
  favorite: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="favorite-card">
    <img
      :src="favorite.thumbnail"
      :alt="favorite.customTitle || favorite.title"
      class="favorite-card__thumbnail"
      loading="lazy"
    />

    <div class="favorite-card__body">
      <h3 class="favorite-card__title">
        {{ favorite.customTitle || favorite.title }}
      </h3>
      <p v-if="favorite.customContent" class="favorite-card__content">
        {{ favorite.customContent }}
      </p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.favorite-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;

  &__thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  &__body {
    padding: var(--space-4);
    flex: 1;
  }

  &__title {
    color: var(--color-text);
    font-size: 1rem;
    margin: 0 0 var(--space-2);
  }

  &__content {
    color: var(--color-text-muted);
    font-size: 0.85rem;
    margin: 0;
  }
}
</style>