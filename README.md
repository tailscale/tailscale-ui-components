# tailscale-ui-components

Tailscale UI component library used by Tailscale web projects. Not maintained for external use.

## Development Setup

### Prerequisites

Ensure you have the following tools installed:

- **Node.js 22.14.0** (use `nvm` to manage Node versions)
  ```bash
  nvm use 22.14.0
  ```
- **Yarn 1.22.19** (package manager)
  ```bash
  npm install -g yarn@1.22.19
  ```

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/tailscale/tailscale-ui-components.git
   cd tailscale-ui-components
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start Storybook for development**
   ```bash
   yarn storybook
   ```
   This will start Storybook on `http://localhost:6006` (or the next available port)

### Available Scripts

- `yarn storybook` - Start Storybook development server
- `yarn build-storybook` - Build Storybook for production
- `yarn build` - Build the component library for production
- `yarn test` - Run tests with Vitest

### Environment Compatibility

This project has been tested and works with:
- **Node.js 22.14.0** (recommended for team consistency)

### Package Management

This project uses **Yarn v1** as the package manager. The `yarn.lock` file should be committed, and `package-lock.json` should be ignored/removed if present.

### Component Development

Components are located in `src/components/` and follow these patterns:

1. **OSS-ready structure** with proper style mappings
2. **Comprehensive TypeScript types** and exported constants
3. **Accessibility features** with proper ARIA attributes
4. **Storybook stories** for documentation and testing

Example component structure:
```
src/components/button/
├── button.tsx           # Main component
├── button.stories.tsx   # Storybook stories
```

### Styling Guidelines

- Use the `.button`, `.input`, and other base CSS classes from `src/tailwind.css`
- Follow the established design tokens and color system
- Ensure components have rounded corners and consistent spacing
- Support both light and dark themes

### Contributing

**Branch Workflow:**

There are many components and stories for those components already ported over from corp to this UI library. They live in the **staging branch**. When making updates to components, adding stories, etc., please submit the PR towards that staging branch. **Main will only contain components that we're actively using in corp and other repos**.

When adding or modifying components:

1. Ensure TypeScript strict mode compliance
2. Add comprehensive Storybook stories
3. Include proper accessibility attributes
4. Follow the established component patterns
5. Export components from `src/index.ts`

### Troubleshooting

**Node.js Version Issues:**
If you encounter build errors, ensure you're using Node.js 22.14.0:
```bash
node --version  # Should output v22.14.0
```

**Package Manager Issues:**
If dependencies fail to install, try:
```bash
rm -rf node_modules yarn.lock
yarn install
```