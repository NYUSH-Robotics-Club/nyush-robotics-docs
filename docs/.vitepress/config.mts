import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'dark',
  title: "NYUSH Robotics",
  description: "Technical documentation for NYU Shanghai Robotics Club",

  sitemap: {
    hostname: 'https://docs.nyushrobotics.club'
  },
  
  locales: {
    root: {
      label: 'Home',
      lang: 'zh'
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/overview' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '概览', link: '/zh/guide/overview' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/overview' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Overview', link: '/en/guide/overview' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/NYUSH-Robotics-Club/nyush-robotics-docs' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  }
})
