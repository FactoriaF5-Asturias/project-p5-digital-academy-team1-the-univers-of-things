<script setup>
import { useFeaturedStore } from '@/stores/featured-store.js'
import { computed } from 'vue'


const featuredStore = useFeaturedStore()

const gameMonth = computed(() => featuredStore.gameOfTheMonth)

</script>




<template>
  <div class="featured-monthly" v-if="gameMonth">
    <div class="featured-monthly__text">
    <span class="featured-monthly__tag">• DESTACADO DEL MES</span>
    <h1 class="featured-monthly__title">{{ gameMonth.title }}</h1>
    <p class="featured-monthly__descripcion">{{ gameMonth.short_description }}</p>
  </div>
    <img :src="gameMonth.thumbnail" class="featured-monthly__image"/>
  </div>
</template>

<style scoped lang="scss">

.featured-monthly {
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  flex-direction: row-reverse;
  gap: 2rem;
  align-items: center;

  &__text {
  }

  &__image {
    width: 300px;
  }
}
</style>