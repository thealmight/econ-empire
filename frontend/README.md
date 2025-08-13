# React & Tailwind CSS Starter Pack

This is a starter pack for creating React projects with Tailwind CSS configured. It uses React version **18.2** and Tailwind CSS version **3.2**.

## Usage

This starter pack includes a basic setup for using **Tailwind CSS with React**. To start building your own components and styles, follow these steps:

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/thepranaygupta/react-tailwind-css-starter-pack.git
    ```

1. Install the required packages.
    ```sh
    cd react-tailwind-css-starter-pack
    npm install
    ```

1. Start the development server.
    ```sh
    npm start
    ```
1. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.
1. Create your React components and add your styles using Tailwind classes. You can also create new CSS files and import them into your components.

The project is set up to use `postcss-cli` to process your CSS files. You can add your own `tailwind.config.js` file to customize your Tailwind setup.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.

# Frontend Deployment Notes

## Vercel
- Set build command: `npm run build`
- Output directory: `build`
- Environment variables (Build time):
  - `REACT_APP_API_BASE` = `https://<your-railway-domain>` or empty for same-origin
  - `REACT_APP_SOCKET_URL` = `https://<your-railway-domain>` or empty for same-origin

If using separate domains (Vercel for frontend, Railway for backend):
- Set `REACT_APP_API_BASE` to the Railway backend URL.
- Set `REACT_APP_SOCKET_URL` to the Railway backend URL.

## Local test after deploy
- Visit the Vercel URL and login; realtime should work if the backend URL and CORS are configured.