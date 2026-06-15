// Utilidades de filtrado y paginacion del catalogo
export function filterByText(games, query) {
    if (!query) return games
    return games.filter(game =>
        game.title.toLowerCase().includes(query.toLowerCase())
    )
}