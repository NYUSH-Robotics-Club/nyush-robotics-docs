import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "NYUSH Robotics",
  description: "Technical documentation for NYU Shanghai Robotics Club",

  sitemap: {
    hostname: 'https://docs.nyushrobotics.club'
  },
  
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      dir: 'zh'
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/'
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '指南', link: '/zh/guide/overview' }
    ],

    sidebar: {
      '/zh/': [
        {
          text: '指南',
          items: [
            { text: '概览', link: '/zh/guide/overview' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/NYUSH-Robotics-Club/nyush-robotics-docs' }
    ]
  }
})
