import { addToaster } from "../../components/toaster";
import { getText } from "../../language";

export function removeService(favorites, oldMovie, updateFavorites) {
    const text = getText()
    let indexMovie = undefined;

    favorites.forEach((item, index) => {
        if (item.id === oldMovie.imdbID) {
            indexMovie = index;
        }
    })

    favorites.splice(indexMovie, 1);
    updateFavorites([...favorites]);
    addToaster({ context: `${text.movie_details_remove_text_1} ${oldMovie.Title} ${text.movie_details_remove_text_2}`, type: 'success' });
}