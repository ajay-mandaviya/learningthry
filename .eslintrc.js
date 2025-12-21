/**
 * ESLint configuration for React Native
 * ------------------------------------
 * Goal:
 * - Catch real bugs early
 * - Enforce safe React & Hooks usage
 * - Keep rules strict but developer-friendly
 * - Suitable for production-grade applications
 */

module.exports = {
  /**
   * Stop ESLint from looking for parent configurations
   */
  root: true,

  /**
   * Base configurations:
   * - @react-native-community: Official RN recommended rules
   * - react-hooks/recommended: Safe Hooks usage
   */
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],

  /**
   * Plugins extend ESLint capabilities
   */
  plugins: ['react', 'react-hooks', 'import'],

  rules: {
    /* ===================== Core JavaScript (Bug Prevention) ===================== */

    // Disallow usage of undeclared variables (prevents runtime crashes)
    'no-undef': 'error',

    // Disallow unreachable code after return/throw/break
    'no-unreachable': 'error',

    // Warn when inner variables shadow outer scope variables
    // Helps avoid confusing and error-prone logic
    'no-shadow': 'warn',

    // Disallow `var`, enforce block-scoped variables (let / const)
    'no-var': 'error',

    // Prefer `const` for variables that are never reassigned
    // Improves readability and prevents accidental mutation
    'prefer-const': 'warn',

    /* ===================== Clean Code ===================== */

    /**
     * Warn on unused variables and arguments
     * - Variables/args starting with `_` are intentionally ignored
     * - Common in callbacks, destructuring, and interfaces
     */
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_', // Ignore unused function arguments starting with "_"
        varsIgnorePattern: '^_', // Ignore unused variables starting with "_"
      },
    ],

    /* ===================== React ===================== */

    // Enforce shorthand boolean props (e.g. <Component disabled />)
    'react/jsx-boolean-value': ['warn', 'never'],

    // Require `key` prop in list rendering
    // Prevents rendering bugs and improves reconciliation
    'react/jsx-key': 'error',

    // Warn when defining components inside render functions
    // Prevents unnecessary re-renders and performance issues
    'react/no-unstable-nested-components': 'warn',

    // Enforce self-closing tags when no children exist
    // Improves JSX readability
    'react/self-closing-comp': 'warn',

    /* ===================== React Hooks (CRITICAL) ===================== */

    /**
     * Enforce the Rules of Hooks
     * - Hooks must be called at the top level
     * - Hooks must not be called conditionally
     * 🚨 NEVER disable this rule
     */
    'react-hooks/rules-of-hooks': 'error',

    /**
     * Warn about missing dependencies in Hooks
     * - Prevents stale closures and state bugs
     * - Warning (not error) because some cases are intentional
     */
    'react-hooks/exhaustive-deps': 'warn',

    /* ===================== Imports ===================== */

    // Disallow duplicate import statements from the same module
    'no-duplicate-imports': 'error',

    // Prevent duplicate imports across multiple import declarations
    // Keeps imports clean and avoids bundle confusion
    'import/no-duplicates': 'error',

    /* ===================== Debugging & Logs ===================== */

    /**
     * Warn on console.log to avoid leaking debug logs into production
     * Allow console.warn and console.error for meaningful logging
     */
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],

    /* ===================== Best Practices ===================== */

    // Enforce strict equality (===) to avoid type coercion bugs
    eqeqeq: ['error', 'always'],

    // Require curly braces for all control statements
    // Prevents accidental logic errors
    curly: ['error', 'all'],

    // Warn when using unnecessary `return await`
    // Improves async performance and readability
    'no-return-await': 'warn',
  },
};
