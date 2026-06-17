<!-- Vista favoritos: CRUD de favoritos, valoracion por estrellas y añadir nuevo -->
<script setup>
import { computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import FavoriteCard from '@/components/favorites/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites-store'

const favoritesStore = useFavoritesStore()
const hasFavorites = computed(() => favoritesStore.favoritesList.length > 0)
</script>

<template>
    <DashboardLayout>
        <section class="favorites-view">
            <h1 class="favorites-view__title">Mis Favoritos</h1>

            <!-- Estado vacío: sin favoritos guardados -->
            <div v-if="!hasFavorites" class="favorites-view__empty" role="status">
                <span class="favorites-view__empty-icon" aria-hidden="true">🎮</span>
                <p>Todavía no tienes favoritos. ¡Explora el catálogo y guarda los que más te gusten!</p>
            </div>

            <!-- Grid de tarjetas de favoritos -->
            <ul v-else class="favorites-view__grid">
                <li
                    v-for="favorite in favoritesStore.favoritesList"
                    :key="favorite.id"
                    class="favorites-view__item"
                >
                    <FavoriteCard :favorite="favorite" />
                </li>
            </ul>
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.favorites-view {
    &__title {
        font-family: $font-display;
        font-weight: 800;
        font-size: 1.8rem;
        color: var(--color-text);
        margin-bottom: 1.5rem;

        @media (min-width: $bp-tablet) {
            font-size: 2rem;
        }

        @media (min-width: $bp-desktop) {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
    }

    &__empty {
        text-align: center;
        padding: var(--space-12);
        color: var(--color-text-muted);
    }

    &__empty-icon {
        display: block;
        font-size: 3rem;
        margin-bottom: var(--space-4);
    }

    &__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        list-style: none;
        padding: 0;
        margin: 0;

        @media (min-width: $bp-tablet) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: $bp-desktop) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
}
</style>