# Contributions Guide for MovieReel

Thank you for considering contributing to **MovieReel**! This open-source project is designed to help users explore details about movies and TV shows using data fetched from the [TMDB API](https://www.themoviedb.org/). Contributions are what make the open-source community such an incredible place to learn, inspire, and create. Your contributions are highly valued, whether it's fixing a bug, adding a feature, or improving documentation.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Contribution Guidelines](#contribution-guidelines)
- [Areas for Contribution](#areas-for-contribution)
- [Need Help?](#need-help)

## How to Contribute

### 1. Fork the Repository

Click the **Fork** button at the top-right corner to create a copy of this repository under your GitHub account.

### 2. Clone Your Fork

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/MovieReel.git
```

### 3. Set Up the Project

- Install the required dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file in the root directory and add your TMDB API key:
  ```
  VITE_APP_API_KEY=your_api_key_here
  ```
- Run the development server:
  ```bash
  npm run dev
  ```

### 4. Make Your Changes

- Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature-or-bug-description
  ```
- Make your changes to the codebase, ensuring your work follows the project’s coding guidelines.

### 5. Test Your Changes

- Run the app to ensure your changes work as expected.
- If you’re adding or modifying components, check for UI consistency with the existing design.
- Write tests if applicable and ensure all tests pass:
  ```bash
  npm test
  ```

### 6. Commit Your Changes

- Commit your changes with a clear and concise commit message:
  ```bash
  git commit -m "Brief description of your changes"
  ```

### 7. Push Your Changes

- Push the changes to your forked repository:
  ```bash
  git push origin feature-or-bug-description
  ```

### 8. Submit a Pull Request

- Go to the original [MovieReel repository](https://github.com/ghosnkarl/MovieReel) and open a **Pull Request (PR)**.
- Provide a detailed description of your changes and link any relevant issues.
- Wait for the maintainers to review your PR. Feedback or changes might be requested before merging.

## Contribution Guidelines

To ensure smooth collaboration, please follow these guidelines:

- **Code Style**: Follow the existing coding style of the project (e.g., formatting, naming conventions). Use `eslint` and `prettier` for consistency.
- **Documentation**: Add or update documentation for any new features or modifications.
- **Dependencies**: Avoid adding unnecessary dependencies. Discuss significant changes in an issue before implementation.
- **Issues**: When addressing an issue, mention the issue number in your PR description (e.g., "Fixes #123").
- **Respectful Communication**: Treat everyone in the community with respect and kindness.

## Areas for Contribution

Here are some ways you can contribute:

1. **Bug Fixes**:

   - Fix reported issues or improve existing features.

2. **New Features**:

   - Suggest and implement new features that align with the project’s goals (e.g., advanced filtering, recommendations).

3. **UI/UX Improvements**:

   - Enhance the design for a better user experience.

4. **Performance Optimization**:

   - Analyze and optimize code for improved performance.

5. **Documentation**:

   - Improve or add to the documentation for better clarity.

6. **Testing**:
   - Write unit and integration tests to improve code coverage.

## Need Help?

If you have any questions about contributing, feel free to:

- Open an issue with your question.
- Contact the maintainers via the repository’s Discussions tab.

We’re excited to see your contributions to **MovieReel**! Thank you for helping make this project better for the entire community.
