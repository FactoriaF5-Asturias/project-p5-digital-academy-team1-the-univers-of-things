import avatar1 from '@/assets/avatars/avatar-1.svg'
import avatar2 from '@/assets/avatars/avatar-2.svg'
import avatar3 from '@/assets/avatars/avatar-3.svg'
import avatar4 from '@/assets/avatars/avatar-4.svg'
import avatar5 from '@/assets/avatars/avatar-5.svg'
import avatar6 from '@/assets/avatars/avatar-6.svg'
import avatar7 from '@/assets/avatars/avatar-7.svg'
import avatar8 from '@/assets/avatars/avatar-8.svg'

export const avatars = [
    { id: 1, src: avatar1, alt: 'Avatar 1' },
    { id: 2, src: avatar2, alt: 'Avatar 2' },
    { id: 3, src: avatar3, alt: 'Avatar 3' },
    { id: 4, src: avatar4, alt: 'Avatar 4' },
    { id: 5, src: avatar5, alt: 'Avatar 5' },
    { id: 6, src: avatar6, alt: 'Avatar 6' },
    { id: 7, src: avatar7, alt: 'Avatar 7' },
    { id: 8, src: avatar8, alt: 'Avatar 8' },
]

const PRESET_PREFIX = 'preset:'

export function presetAvatarRef(id) {
    return `${PRESET_PREFIX}${id}`
}

// profileImg guarda un id de preset ("preset:3") o una URL absoluta subida a
// Firebase Storage. Una URL de asset local (import de Vite) no es estable
// entre entornos: en local resuelve a /src/assets/..., en producción a un
// asset con hash bajo /assets/, así que nunca se persiste directamente.
export function resolveAvatarSrc(profileImg) {
    if (!profileImg) return null
    if (profileImg.startsWith(PRESET_PREFIX)) {
        const id = Number(profileImg.slice(PRESET_PREFIX.length))
        return avatars.find((a) => a.id === id)?.src ?? null
    }
    return profileImg
}
