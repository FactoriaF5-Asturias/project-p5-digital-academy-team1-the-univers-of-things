<!-- Vista perfil de usuario: cambio de avatar y contraseña -->
<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth.js'

import avatar1 from '@/assets/avatars/avatar-1.svg'
import avatar2 from '@/assets/avatars/avatar-2.svg'
import avatar3 from '@/assets/avatars/avatar-3.svg'
import avatar4 from '@/assets/avatars/avatar-4.svg'
import avatar5 from '@/assets/avatars/avatar-5.svg'
import avatar6 from '@/assets/avatars/avatar-6.svg'
import avatar7 from '@/assets/avatars/avatar-7.svg'
import avatar8 from '@/assets/avatars/avatar-8.svg'

const auth = useAuthStore()

const avatars = [
    { id: 1, src: avatar1, alt: 'Avatar 1' },
    { id: 2, src: avatar2, alt: 'Avatar 2' },
    { id: 3, src: avatar3, alt: 'Avatar 3' },
    { id: 4, src: avatar4, alt: 'Avatar 4' },
    { id: 5, src: avatar5, alt: 'Avatar 5' },
    { id: 6, src: avatar6, alt: 'Avatar 6' },
    { id: 7, src: avatar7, alt: 'Avatar 7' },
    { id: 8, src: avatar8, alt: 'Avatar 8' },
]

const selectedAvatar = ref(null)
const avatarFeedback = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordFeedback = ref('')
const passwordError = ref('')

async function handleSelectAvatar(avatar) {
    selectedAvatar.value = avatar.id
    try {
        await auth.updateAvatar(avatar.src)
        avatarFeedback.value = '✓ Avatar actualizado'
        setTimeout(() => { avatarFeedback.value = '' }, 2500)
    } catch {
        avatarFeedback.value = 'Error al actualizar el avatar'
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
        avatarFeedback.value = 'Solo se permiten imágenes (JPG, PNG)'
        return
    }
    // TODO: subir a Firebase Storage
    avatarFeedback.value = 'Subida a Firebase Storage próximamente'
}

async function handleChangePassword() {
    passwordError.value = ''
    passwordFeedback.value = ''

    if (newPassword.value !== confirmPassword.value) {
        passwordError.value = 'Las contraseñas no coinciden'
        return
    }
    if (newPassword.value.length < 6) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres'
        return
    }

    try {
        await auth.changePassword(currentPassword.value, newPassword.value)
        passwordFeedback.value = '✓ Contraseña actualizada correctamente'
        currentPassword.value = ''
        newPassword.value = ''
        confirmPassword.value = ''
        setTimeout(() => { passwordFeedback.value = '' }, 2500)
    } catch {
        passwordError.value = 'Contraseña actual incorrecta'
    }
}
</script>

<template>
    <DashboardLayout>
        <section class="profile-view">
            <h1 class="profile-view__title">Mi Perfil</h1>

            <div class="profile-view__grid">

                <!-- Columna izquierda: avatar -->
                <div class="profile-view__card">

                    <div class="profile-view__avatar-wrap">
                        <img :src="auth.profile?.profileImg || avatar1" :alt="`Avatar de ${auth.profile?.username}`"
                            class="profile-view__avatar" />
                        <p class="profile-view__name">{{ auth.profile?.username }}</p>
                        <p class="profile-view__email">{{ auth.user?.email }}</p>
                    </div>

                    <div class="profile-view__picker">
                        <p class="profile-view__picker-title">Elige tu avatar</p>
                        <ul class="profile-view__avatars" role="list" aria-label="Galería de avatares">
                            <li v-for="avatar in avatars" :key="avatar.id">
                                <button class="profile-view__avatar-option"
                                    :class="{ 'profile-view__avatar-option--selected': selectedAvatar === avatar.id }"
                                    :aria-label="`Seleccionar ${avatar.alt}`"
                                    :aria-pressed="selectedAvatar === avatar.id" type="button"
                                    @click="handleSelectAvatar(avatar)">
                                    <img :src="avatar.src" :alt="avatar.alt" width="40" height="40" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="profile-view__divider" aria-hidden="true">
                        <span>o</span>
                    </div>

                    <button class="profile-view__firebase-btn" type="button" @click="$refs.fileInput.click()">
                        Subir desde Firebase Storage
                    </button>
                    <input ref="fileInput" type="file" accept="image/*" class="profile-view__file-input"
                        aria-label="Subir imagen de avatar" @change="handleFileUpload" />

                    <p v-if="avatarFeedback" class="profile-view__feedback" role="status" aria-live="polite">
                        {{ avatarFeedback }}
                    </p>
                </div>

                <!-- Columna derecha: cambio de contraseña -->
                <div class="profile-view__card">
                    <h2 class="profile-view__card-title">Cambiar contraseña</h2>

                    <div class="profile-view__form">
                        <div class="profile-view__field">
                            <label for="current-password" class="profile-view__label">Contraseña actual</label>
                            <input id="current-password" v-model="currentPassword" type="password"
                                class="profile-view__input" placeholder="••••••••••" autocomplete="current-password" />
                        </div>

                        <div class="profile-view__field">
                            <label for="new-password" class="profile-view__label">Nueva contraseña</label>
                            <input id="new-password" v-model="newPassword" type="password" class="profile-view__input"
                                placeholder="••••••••••" autocomplete="new-password" />
                        </div>

                        <div class="profile-view__field">
                            <label for="confirm-password" class="profile-view__label">Confirmar nueva contraseña</label>
                            <input id="confirm-password" v-model="confirmPassword" type="password"
                                class="profile-view__input" placeholder="••••••••••" autocomplete="new-password" />
                        </div>

                        <p v-if="passwordError" class="profile-view__error" role="alert">
                            {{ passwordError }}
                        </p>
                        <p v-if="passwordFeedback" class="profile-view__feedback" role="status" aria-live="polite">
                            {{ passwordFeedback }}
                        </p>

                        <button class="profile-view__submit" type="button" @click="handleChangePassword">
                            Actualizar contraseña
                        </button>
                    </div>
                </div>

            </div>
        </section>
    </DashboardLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/base/variables' as *;

.profile-view {
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
}
</style>