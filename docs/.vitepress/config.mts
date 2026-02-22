import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: 'dark',
  title: "NYUSH Robotics",
  description: "Technical documentation for NYU Shanghai Robotics Club",
  markdown: {
    config: (md) => {
      const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules)
      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = token.info.trim()
        if (info === 'mermaid') {
          return `<pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre>`
        }
        if (defaultFence) {
          return defaultFence(tokens, idx, options, env, self)
        }
        return self.renderToken(tokens, idx, options)
      }
    }
  },

  sitemap: {
    hostname: 'https://docs.nyushrobotics.club'
  },
  
  locales: {
    root: {
      lang: 'zh'
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: 'Robomaster', link: '/zh/robomaster/' },
          { text: 'VEX', link: '/zh/vex/' }
        ],
        sidebar: {
          '/zh/robomaster/': [
            {
              text: '学习路径',
              items: [
                { text: '00 前言', link: '/zh/robomaster/00-preface' },
                { text: '01 工具与环境', link: '/zh/robomaster/01-tools-and-env' },
                { text: '02 第一次编译与烧录', link: '/zh/robomaster/02-first-build-flash' },
                { text: '03 硬件与安全基础', link: '/zh/robomaster/03-hardware-safety' },
                { text: '04 CAN 通信入门', link: '/zh/robomaster/04-can-intro' },
                { text: '05 架构与任务流', link: '/zh/robomaster/05-app-architecture' },
                { text: '06 Application 层代码结构', link: '/zh/robomaster/06-application-layer-code-structure' },
                { text: '07 调试与调参工作流', link: '/zh/robomaster/07-debug-workflow' },
                { text: '08 裁判系统与 UI 入门', link: '/zh/robomaster/08-referee-system-and-ui' },
              ]
            },
            {
              text: '参考附录',
              items: [
                { text: '赛季与规则', link: '/zh/robomaster/season-rules' },
                { text: '硬件概览', link: '/zh/robomaster/hardware-overview' },
                { text: '硬件手册 PDF', link: '/zh/robomaster/hardware-manuals' },
                { text: 'Git 与开发环境', link: '/zh/robomaster/git-env' }
              ]
            }
          ],
          '/zh/vex/': [
            {
              text: 'VEXU',
              items: [
                { text: '总览', link: '/zh/vex/' },
                { text: '01 评审总览', link: '/zh/vex/01-vexu-judging-overview' },
                { text: '02 Notebook 要求', link: '/zh/vex/02-engineering-notebook-requirements' },
                { text: '03 Interview 要求', link: '/zh/vex/03-team-interview-requirements' },
                { text: '04 提交与赛前清单', link: '/zh/vex/04-submission-and-prep-checklist' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Robomaster', link: '/en/robomaster/' },
          { text: 'VEX', link: '/en/vex/' }
        ],
        sidebar: {
          '/en/robomaster/': [
            {
              text: 'Learning Path',
              items: [
                { text: '00 Preface', link: '/en/robomaster/00-preface' },
                { text: '01 Getting Started', link: '/en/robomaster/01-start-here' },
                { text: '02 Tools and Environment', link: '/en/robomaster/02-tools-and-env' },
                { text: '03 First Build and Flash', link: '/en/robomaster/03-first-build-flash' },
                { text: '04 Hardware and Safety Basics', link: '/en/robomaster/04-hardware-safety' },
                { text: '05 CAN Basics', link: '/en/robomaster/05-can-intro' },
                { text: '06 Architecture and Task Flow', link: '/en/robomaster/07-app-architecture' },
                { text: '07 Application Layer Code Structure', link: '/en/robomaster/09-application-layer-code-structure' },
                { text: '08 Debug and Tuning Workflow', link: '/en/robomaster/08-debug-workflow' },
                { text: '09 Referee System and UI Basics', link: '/en/robomaster/12-referee-system-and-ui' },
              ]
            },
            {
              text: 'Reference',
              items: [
                { text: 'Season and Rules', link: '/en/robomaster/season-rules' },
                { text: 'Hardware Overview', link: '/en/robomaster/hardware-overview' },
                { text: 'Hardware Manuals', link: '/en/robomaster/hardware-manuals' },
                { text: 'Git and Environment', link: '/en/robomaster/git-env' }
              ]
            }
          ],
          '/en/vex/': [
            {
              text: 'VEXU',
              items: [
                { text: 'Overview', link: '/en/vex/' },
                { text: '01 Judging Overview', link: '/en/vex/01-vexu-judging-overview' },
                { text: '02 Notebook Requirements', link: '/en/vex/02-engineering-notebook-requirements' },
                { text: '03 Interview Requirements', link: '/en/vex/03-team-interview-requirements' },
                { text: '04 Submission Checklist', link: '/en/vex/04-submission-and-prep-checklist' }
              ]
            }
          ]
        }
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
