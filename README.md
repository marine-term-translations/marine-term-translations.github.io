# Marine Term Translations General Site

This React-based web application allows users to browse GitHub repositories from the 'marine-term-translations' organization that contain a specific keyword, currently set to 'Repo'. The site also displays Markdown files by fetching their content from GitHub. The app is composed of four main components: `App`, `NavBar`, `MarkdownViewer`, and `ListRepo`.

## Deployment Instructions

To deploy this project:
1. Clone the repository.
   ```bash
   git clone https://github.com/marine-term-translations/marine-term-translations.github.io.git
   cd project-repo
   ```
2. Install dependencies using 
   ```bash
   npm install
   ```
3. Deploy the project using 
   ```bash
   npm run deploy
   ```

## Components Overview

### 1. `App`
The `App` component handles the routing of the application using `HashRouter`. It defines routes that point to different pages, each rendering a specific view. The `fullLink` property in the `MarkdownViewer` component specifies the URL of the Markdown file to be fetched and displayed on the respective page.

Routes include:
- `/`: Home page with a Markdown viewer.
- `/list`: Displays a list of repositories containing the keyword 'Repo'.
- `/about`: Shows usage information for the translation site.
- `/front`, `/back`, `/gh_action`, `/general`: Developer-focused sections for front-end, back-end, GitHub Actions, and general information.
- `/instruction`: Administrator instructions page (currently not filled).

### 2. `NavBar`
The `NavBar` component provides navigation across different sections of the site. It features dropdown menus that guide users to translation, development, and administration areas, making it easy to access repositories, documentation, and instructions.

### 3. `ListRepo`
The `ListRepo` component fetches and displays a list of repositories from the 'marine-term-translations' organization that contain the keyword 'Repo'. It includes a search bar for filtering repositories by name. This component interacts with GitHub’s REST API to retrieve repositories, handling loading states and errors.

### 4. `MarkdownViewer`
The `MarkdownViewer` component is responsible for fetching and rendering Markdown content from specified GitHub URLs using the `fullLink` property. It ensures that images and links in the Markdown are displayed correctly, even when they use relative paths. If the URL is invalid or unavailable, it displays appropriate error messages.

## Key Features
- **Repository Listing**: Automatically fetches and displays repositories containing the keyword 'Repo'.
- **Markdown Rendering**: Renders Markdown content directly from GitHub, supporting various file formats and languages.
- **Navigation**: User-friendly navigation system through dropdown menus, providing access to different site sections.
- **Developer and Administrator Sections**: Dedicated sections for developers and administrators, displaying relevant documentation and instructions.