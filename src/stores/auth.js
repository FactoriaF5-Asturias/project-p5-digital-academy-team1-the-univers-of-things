import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../api/firebase.js'
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const loading = ref(true)

    onAuthStateChanged(auth, (firebaseUser) => {

        user.value = firebaseUser
        loading.value = false
    })
    return { user, loading )  
})

