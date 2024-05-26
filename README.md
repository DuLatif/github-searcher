# GitHub Search, Filter, and Pagination Application

## Introduction

This project is a simple single-page application built with ReactJS, Redux, Redux Persist, React Router, and other modern technologies. It allows users to search for users or repositories on GitHub, displaying the results in a responsive grid format. The application efficiently handles API calls, loading states, and pagination.

## Installation and Setup

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Create a `.env` file based on the provided `.env.example` file.
4. Set the `VITE_API_URL` to `https://api.github.com`.
5. Generate a GitHub API token [here](https://github.com/settings/tokens) and add it to `VITE_GITHUB_TOKEN` in the `.env` file.
6. Start the development server using `yarn dev`.
7. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)
- [vitest](https://github.com/dfrankland/vitest)
- [@testing-library](https://testing-library.com/)
- [SASS](https://sass-lang.com/)
- [Typescript](https://www.typescriptlang.org/)

## Usage

Once the application is running, you can perform the following actions:

- Use the search field to type your query.
- Choose between searching for users or repositories using the dropdown menu.
- As you type, the application will fetch and display the results in a grid format above.
- Pagination allows you to navigate through multiple pages of results.
- Various states such as initial, loading, and error are handled gracefully, providing feedback to the user.

## Technologies Used

- React
- React Router DOM
- Redux
- Redux Persist
- Axios
- Vite
- vitest
- @testing-library
- SASS
- TypeScript

## Commands

- `yarn dev`: Starts the development server.
- `yarn test`: Runs tests.
- `yarn build`: Builds the project for production.

## Deployment

A live demo of the project is available at [https://dulatif-github-searcher.netlify.app](https://dulatif-github-searcher.netlify.app).
