import { describe, it, expect } from 'vitest'
import { filterByText } from '../catalog-utils'

const mockGames = [
    { id: 1, title: 'Lost Ark', genre: 'MMORPG', platform: 'PC (Windows)' },
    { id: 2, title: 'Fortnite', genre: 'Shooter', platform: 'PC (Windows)' },
    { id: 3, title: 'Albion Online', genre: 'MMORPG', platform: 'PC (Windows)' }
]

describe('filterByText', () => {
    it('devuelve solo los juegos que contienen el texto buscado', () => {
        const result = filterByText(mockGames, 'lost')
        expect(result).toHaveLength(1)
        expect(result[0].title).toBe('Lost Ark')
    })

    it('devuelve todos los juegos si el texto esta vacio', () => {
        const result = filterByText(mockGames, '')
        expect(result).toHaveLength(3)
    })

    it('la busqueda no distingue mayusculas de minusculas', () => {
        const result = filterByText(mockGames, 'FORTNITE')
        expect(result).toHaveLength(1)
        expect(result[0].title).toBe('Fortnite')
    })
})