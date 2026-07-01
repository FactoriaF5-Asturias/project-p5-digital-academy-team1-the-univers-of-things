import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

vi.mock('@/layouts/AdminLayout.vue', () => ({ default: { template: '<slot />' } }))
vi.mock('@/stores/featured-store.js', () => ({ useFeaturedStore: vi.fn() }))

import { useFeaturedStore } from '@/stores/featured-store.js'
import AdminFeaturedView from '../AdminFeaturedView.vue'

describe('AdminFeaturedView', () => {
  let featuredStoreMock

  beforeEach(() => {
    featuredStoreMock = {
      catalog: [
        { id: 'a', title: 'Quantum Strike', thumbnail: 'a.jpg' },
        { id: 'b', title: 'Neon Odyssey', thumbnail: 'b.jpg' },
      ],
      featuredList: [],
      gameOfTheMonth: null,
      fetchAll: vi.fn(() => Promise.resolve()),
      addFeatured: vi.fn(() => Promise.resolve()),
      removeFeatured: vi.fn(() => Promise.resolve()),
      selectMonthly: vi.fn(() => Promise.resolve()),
    }
    useFeaturedStore.mockReturnValue(featuredStoreMock)
  })

  it('filtra sugerencias de juegos activos por texto de búsqueda', async () => {
    const wrapper = mount(AdminFeaturedView)

    const input = wrapper.find('#active-search')
    await input.trigger('focus')
    await input.setValue('quantum')

    expect(wrapper.text()).toContain('Quantum Strike')
    expect(wrapper.text()).not.toContain('Neon Odyssey')
  })
})
