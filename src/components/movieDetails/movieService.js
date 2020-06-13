import { addToaster } from "../../components/toaster";

export function removeService(favorites, oldMovie, updateFavorites) {
    let indexMovie = undefined;

    favorites.forEach((item, index) => {
        if (item.id === oldMovie.imdbID) {
            indexMovie = index;
        }
    })

    favorites.splice(indexMovie, 1);
    updateFavorites([...favorites]);
    addToaster({ context: `O filme ${oldMovie.Title} foi removido da sua lista de favoritos`, type: 'success' });
}