// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tata Tertib & Panduan RuangKita',
  tagline: 'Dokumentasi peminjaman ruangan dan pelacakan izin kegiatan Universitas Brawijaya',
  favicon: 'img/logo-mark.svg',

  future: {
    v4: true,
  },

  url: 'http://127.0.0.1:8000',
  baseUrl: '/docs/',
  trailingSlash: true,

  organizationName: 'RuangKita',
  projectName: 'RuangKita',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'RuangKita Docs',
        logo: {
          alt: 'RuangKita Logo',
          src: 'img/logo-mark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tata Tertib & Panduan',
          },
          {
            href: '/dashboard',
            label: '← Kembali ke Aplikasi',
            position: 'right',
            target: '_self',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: `© ${new Date().getFullYear()} RuangKita • Universitas Brawijaya.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
