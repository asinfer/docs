import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Headless Hyper-Efficient API',
  description: 'A latency-aware, retrieval-first API architecture for intelligent inference routing',
  base: '/docs/',

  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'HHE API',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Scope', link: '/scope/' },
      { text: 'Area', link: '/area/' },
      { text: 'Idea', link: '/idea/' },
      { text: 'Plan', link: '/plan/' },
      { text: 'Start Over', link: '/start-over/' },
      { text: 'GitHub', link: 'https://github.com/asinfer/docs' }
    ],

    sidebar: {
      '/scope/': [
        {
          text: 'Scope',
          items: [
            { text: 'Overview', link: '/scope/' },
            { text: 'Problem', link: '/scope/problem' },
            { text: 'Non-Goals', link: '/scope/non-goals' },
            { text: 'Principles', link: '/scope/principles' }
          ]
        }
      ],
      '/area/': [
        {
          text: 'Area',
          items: [
            { text: 'Overview', link: '/area/' },
            { text: 'Inference Optimization', link: '/area/inference' },
            { text: 'Knowledge Retrieval', link: '/area/retrieval' },
            { text: 'Vector Databases', link: '/area/vector-databases' },
            { text: 'Agentic Systems', link: '/area/agentic-systems' },
            { text: 'Orchestration', link: '/area/orchestration' },
            { text: 'MLOps', link: '/area/mlops' },
            { text: 'DevOps', link: '/area/devops' },
            { text: 'GraphQL', link: '/area/graphql' }
          ]
        }
      ],
      '/idea/': [
        {
          text: 'Idea',
          items: [
            { text: 'Overview', link: '/idea/' },
            { text: 'Architecture', link: '/idea/architecture' },
            { text: 'Semantic Cache', link: '/idea/semantic-cache' },
            { text: 'State Machine', link: '/idea/state-machine' },
            { text: 'SLM Routing', link: '/idea/slm-routing' },
            { text: 'Frontier Escalation', link: '/idea/frontier-escalation' },
            { text: 'Learning Loop', link: '/idea/learning-loop' }
          ]
        }
      ],
      '/plan/': [
        {
          text: 'Plan',
          items: [
            { text: 'Overview', link: '/plan/' },
            { text: 'Deep Anchor', link: '/plan/deep-anchor' },
            { text: 'Regional Competition', link: '/plan/regional-competition' },
            { text: 'Olympus', link: '/plan/olympus' },
            { text: 'Roadmap', link: '/plan/roadmap' },
            { text: 'Milestones', link: '/plan/milestones' }
          ]
        }
      ],
      '/start-over/': [
        {
          text: 'Start Over',
          items: [
            { text: 'Overview', link: '/start-over/' },
            { text: 'Failure Analysis', link: '/start-over/failure' },
            { text: 'Broken Assumptions', link: '/start-over/assumptions' },
            { text: 'Lessons Learned', link: '/start-over/lessons' },
            { text: 'Next Iteration', link: '/start-over/next-iteration' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/asinfer/docs' }
    ],

    footer: {
      message: 'Research-driven path from deep technical mastery to production-grade infrastructure',
      copyright: 'Made with VitePress'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/asinfer/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
