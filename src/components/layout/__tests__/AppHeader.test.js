import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/api/firebase', () => ({ auth: {} }))
vi.mock('@/stores/auth', () => ({ useAuthStore: vi.fn() }))

import { useAuthStore } from '@/stores/auth'
import AppHeader from '../AppHeader.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/login', component: { template: '<div />' } },
        { path: '/register', component: { template: '<div />' } },
        { path: '/dashboard', component: { template: '<div />' } }
    ]
})

describe('AppHeader', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('ST13 — muestra botones de login y registro cuando no hay sesion', () => {
        useAuthStore.mockReturnValue({
            user: null,
            profile: null,
            logout: vi.fn()
        })

        const wrapper = mount(AppHeader, {
            global: { plugins: [router] }
        })

        expect(wrapper.text()).toContain('Iniciar sesión')
        expect(wrapper.text()).toContain('Registrarse')
        expect(wrapper.text()).not.toContain('Cerrar sesión')
    })
})