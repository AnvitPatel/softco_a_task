# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



colone project 

1 :- Install Node Modules

Command: npm i
This installs all necessary dependencies listed in your package.json.

2:- Start the Project

Command: npm run dev
This command will start your development server. Make sure your setup in package.json includes a dev script (e.g., "dev": "next dev" for Next.js or "dev": "vite" for Vite).

3:- Start the Mock API

Open a terminal window (Git Bash or any terminal you prefer).

Command: json-server --watch db.json --port 3031

This command will start json-server to serve data from db.json on port 3031. Note: The port 3031 is specified as required, so make sure to keep this port free.

If json-server is not installed globally, install it first with:

Command: npm install -g json-server



