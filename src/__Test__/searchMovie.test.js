import React from 'react';
import { fireEvent, render, waitForElement, cleanup } from "@testing-library/react";

import App from "../App";

afterEach(cleanup);

it('Should search some movie (The Lord of the Rings)', async () => {
    const movieTitle = 'The Lord of the Rings';
    const { getByTestId } = render(<App />);
    const input = await waitForElement(() => getByTestId('input-search-movie'))

    fireEvent.change(input, { target: { value: movieTitle } })
    expect(input.value).toEqual(movieTitle);

    const form = await waitForElement(() => getByTestId('form-search-movie'))
    fireEvent.submit(form)

    const containerMovie = await waitForElement(() => getByTestId('container-search-movie'))
    expect(containerMovie).toHaveTextContent(movieTitle)
});

it('Should favorite movie', async () => {
    const { getByTestId } = render(<App />);
    const movieTitle = 'The Lord of the Rings';
    const input = await waitForElement(() => getByTestId('input-search-movie'))
    fireEvent.change(input, { target: { value: movieTitle } })

    const form = await waitForElement(() => getByTestId('form-search-movie'))
    fireEvent.submit(form)

    
    const btnAddFavorite = await waitForElement(() => getByTestId('btn-add-favorite'));
    fireEvent.click(btnAddFavorite);
    
    const btnRemoveFavorite = await waitForElement(() => getByTestId('btn-remove-favorite'));
});

it('Should navigate to favorites and remove movie', async () => {
    const { getByTestId } = render(<App />);
    const btnGotoFavorites = await waitForElement(() => getByTestId('header-navigate-to-favorites'));
    fireEvent.click(btnGotoFavorites);

    const btnRemoveItem = await waitForElement(() => getByTestId('favorite-remove-item-0'));
    fireEvent.click(btnRemoveItem);
});

it('Ensure has no favorite movies', async () => {
    const { getByTestId } = render(<App />);
    const btnGotoFavorites = await waitForElement(() => getByTestId('header-navigate-to-favorites'));
    fireEvent.click(btnGotoFavorites);

    const btnGoBackSearch = await waitForElement(() => getByTestId('has-no-items'));
    fireEvent.click(btnGoBackSearch)
});

it('Confere a new favorite item', async () => {
    const { getByTestId } = render(<App />);
    const movieTitle = 'The Lord of the Rings';
    const input = await waitForElement(() => getByTestId('input-search-movie'))
    fireEvent.change(input, { target: { value: movieTitle } })

    const form = await waitForElement(() => getByTestId('form-search-movie'))
    fireEvent.submit(form)

    const btnAddFavorites = await waitForElement(() => getByTestId('btn-add-favorite'));
});