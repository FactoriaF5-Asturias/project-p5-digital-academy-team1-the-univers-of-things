<!-- Vista login: formulario de acceso con email, contraseña y acceso admin -->
<template>
  <MainLayout>

    <div class="login-view">

      <div class="login-view__card">

        <!-- Logo -->
        <div class="login-view__logo">
          <div class="login-view__logo-icon">FPS</div>
          <span class="login-view__logo-text">FPS</span>
          <span class="login-view__subtitle">Accede a tu cuenta</span>
        </div>

        <!-- FORMULARIO -->
        <form class="login-view__form">

          <div class="login-view__field">
            <label for="email" class="login-view__label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              class="login-view__input"
              placeholder="tu@email.com"
            />
          </div>

          <div class="login-view__field">
            <label for="password" class="login-view__label">Contraseña</label>
            <input
              id="password"
              type="password"
              class="login-view__input"
              placeholder="••••••••••"
            />
          </div>

          <button type="submit" class="login-view__btn-primary">
            Iniciar sesión
          </button>

        </form>

        <!-- ENLACE A REGISTRO -->
        <div class="login-view__register">
          ¿No tienes cuenta?
          <RouterLink to="/register">Regístrate</RouterLink>
        </div>

        <!-- ACCESO PARA ADMINISTRADOR -->
        <div class="login-view__demo">
          <p class="login-view__demo-title">Acceso de demostración</p>
          <button type="button" class="login-view__btn-admin">
            ⚙️ Entrar como Admin
          </button>
        </div>

      </div>
    </div>

  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
</script>

<style scoped>
</style>