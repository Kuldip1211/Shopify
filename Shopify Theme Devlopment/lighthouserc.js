module.exports = {
  ci: {
    collect: {
      // 👇 Replace with your store's preview or live URL
      url: [
        'https://shivgardning.myshopify.com/',
        'https://shivgardning.myshopify.com/pages/shop',
        'https://shivgardning.myshopify.com/pages/contact'
      ],
      startServerCommand: 'echo "Using live Shopify site"',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
