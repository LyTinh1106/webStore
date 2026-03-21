# webStore

A robust e-commerce platform built with Node.js and Express.js, primarily designed for managing and selling computer components and electronics. It offers a comprehensive solution for product display, shopping cart functionality, user account management, and a streamlined checkout process.

## Table of Contents

-   [Key Features & Benefits](#key-features--benefits)
-   [Prerequisites & Dependencies](#prerequisites--dependencies)
-   [Installation & Setup Instructions](#installation--setup-instructions)
-   [Usage Examples](#usage-examples)
-   [Configuration Options](#configuration-options)
-   [Contributing Guidelines](#contributing-guidelines)
-   [License Information](#license-information)
-   [Acknowledgments](#acknowledgments)

## Key Features & Benefits

This project aims to provide a complete e-commerce experience with a focus on ease of use and maintainability.

### Features

*   **Product Catalog Management**: Display computer components categorized by various brands and product types.
*   **Shopping Cart Functionality**: Users can add, update, and remove items from their shopping cart.
*   **User Account Management**: Create and manage user accounts for a personalized shopping experience.
*   **Secure Checkout Process**: A guided checkout flow for purchasing products.
*   **Backend Import Management**: Functionality for administrators to manage product imports and inventory (implied by `ImportingController`).
*   **Dynamic Content Rendering**: Utilizes EJS as a view engine for server-side template rendering.

### Benefits

*   **Streamlined User Experience**: Intuitive design for browsing and purchasing products.
*   **Modular Architecture**: Built with a clear separation of concerns using controllers and configuration files, making it easier to develop and scale.
*   **Efficient Product Management**: Simplifies the process of adding and managing inventory.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: LTS version recommended.
*   **npm**: Node Package Manager, which comes bundled with Node.js.
*   **MySQL**: A relational database server to store application data.

## Installation & Setup Instructions

Follow these steps to get your development environment up and running:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/LyTinh1106/webStore.git
    cd webStore
    ```

2.  **Install Node.js Dependencies**:
    Navigate to the project's root directory and install all required packages:
    ```bash
    npm install
    ```

3.  **Database Setup**:
    *   Ensure your MySQL server is running.
    *   Create a new MySQL database (e.g., `pc_store_db`).
    *   Execute the SQL script `src/config/PC_Store_DB.sql` to create the necessary tables and schema.
    *   (Optional) Execute `src/config/InsertInToData.sql` to populate your database with sample data.

4.  **Environment Configuration**:
    Create a `.env` file in the root directory of your project. This file will store sensitive information like database credentials.
    ```env
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=pc_store_db
    PORT=3000
    ```
    *Replace `your_mysql_username` and `your_mysql_password` with your actual MySQL credentials.*

5.  **Start the Server**:
    To start the application in development mode (with `nodemon` for automatic restarts on file changes):
    ```bash
    npm start
    ```

## Usage Examples

Once the server is running, you can access the application through your web browser.

1.  Open your web browser and navigate to `http://localhost:<PORT>` (e.g., `http://localhost:3000` if you set `PORT=3000` in your `.env` file).
2.  Browse the available computer components, add items to your shopping cart, create an account, and proceed through the checkout process.

This project is primarily a full-stack web application with server-side rendering. Direct API usage documentation is not provided, as frontend interactions are handled by the Express.js controllers.

## Configuration Options

The following configurations can be customized to suit your environment:

*   **Database Connection**: Configured via environment variables in the `.env` file (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). These are used by `src/config/database.js` to establish the connection.
*   **Server Port**: The `PORT` environment variable in the `.env` file defines which port the Express server will listen on.
*   **View Engine**: The application uses EJS for templating, configured in `src/config/ViewEngine.js`.
*   **Static Files**: Static assets (CSS, JavaScript, images) are served from the `src/public` directory, also configured in `src/config/ViewEngine.js`.

## Contributing Guidelines

We welcome contributions to the `webStore` project! If you'd like to contribute, please follow these guidelines:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/issue-description
    ```
3.  **Make your changes** and commit them with clear, concise messages.
4.  **Push your branch** to your forked repository.
5.  **Open a Pull Request** to the `main` branch of this repository. Provide a detailed description of your changes and why they are necessary.
6.  Ensure your code adheres to the existing coding style and passes any tests.
7.  For bug reports or feature suggestions, please open an issue in the GitHub issue tracker.

## License Information

This project is licensed under the ISC License. See the `package.json` file for details.

## Acknowledgments

*   **HTML/CSS Theme**: The frontend design elements, particularly the `checkout.html` and related assets, are inspired by or based on the "Electro - HTML Ecommerce Template". We acknowledge [ThemeWagon](https://themewagon.com/) as a valuable resource for high-quality HTML templates.
*   **Development Tools**: We utilize [Nodemon](https://nodemon.io/) for efficient development by automatically restarting the server on file changes.
*   **Database Driver**: The `mysql2` package is used for robust and efficient interaction with MySQL databases.
