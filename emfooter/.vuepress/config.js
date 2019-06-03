const base = process.env.GH ? '/footer/' : '/'

module.exports = {
  title: '底部组件',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  themeConfig: {
    repo: 'em-fe/footer',
    editLinks: false,
    searchMaxSuggestions: 5,
    docsDir: 'emfooter',
    editLinkText: '帮助我们改善此页面！',
    sidebar: [
      '/',
      '/footer-wap/zh-cn',
    ]
  }
}
