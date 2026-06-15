<script setup>
    import ItemCard from '@/components/items/ItemCard.vue'

    const games = [
  { id: 1, title: 'Juego 1', short_description: 'Descripción', thumbnail: '', genre: 'Acción', platform: 'PC' },
  { id: 2, title: 'Juego 2', short_description: 'Descripción', thumbnail: '', genre: 'RPG', platform: 'PS5' },
  { id: 3, title: 'Juego 3', short_description: 'Descripción', thumbnail: '', genre: 'FPS', platform: 'Xbox' },
]
</script>

<template>
    <div class="featured-grid">
        <ItemCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        />
    </div>
</template>