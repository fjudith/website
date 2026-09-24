import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Florian JUDITH',
  tagline: 'Architecture, plateformes agentiques et platform engineering',
  favicon: 'img/florian-judith-icon-color.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://fjudith.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'.
  // Overridable via DOCUSAURUS_BASE_URL so the Slidev build (which needs the
  // same prefix for its assets) and the site stay in sync.
  baseUrl: process.env.DOCUSAURUS_BASE_URL || '/website/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'fjudith', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Render ```mermaid code blocks (used by CALM architecture rendering).
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    '@docusaurus/theme-live-codeblock',
    // CSS-only dark-first theme (overrides Infima variables). Keep the site's
    // own favicon rather than the theme's.
    ['cosmos-docusaurus-theme', { injectFavicon: false }],
  ],

  // Le contenu source est en français ; l'anglais reçoit les traductions.
  // Quand une traduction manque, Docusaurus affiche le contenu source (FR).
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    localeConfigs: {
      fr: { label: 'Français' },
      en: { label: 'English' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/fjudith/website/tree/main/workspaces/docusaurus/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/fjudith/website/tree/main/workspaces/docusaurus/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Florian JUDITH',
      logo: {
        alt: 'Florian Judith logo',
        src: 'img/florian-judith-icon-color.svg',
      },
      items: [
        { to: '/blog', label: 'Articles', position: 'left' },
        { to: '/decks', label: 'Présentations', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Notes',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/fjudith/website',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contenu',
          items: [
            {
              label: 'Articles',
              to: '/blog',
            },
            {
              label: 'Présentations',
              to: '/decks',
            },
          ],
        },
        {
          title: 'Liens',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/fjudith',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Florian JUDITH. Construit avec Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Languages not bundled by default in prism-react-renderer must be
      // listed here to get syntax highlighting (e.g. bash/toml/yaml).
      additionalLanguages: ['bash', 'toml', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
