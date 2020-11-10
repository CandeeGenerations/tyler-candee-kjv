require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `John Lacombe - Blog`,
    name: `John Lacombe`,
    siteUrl: `https://pastor.odentonbaptist.org`,
    description: `Posts from John Lacombe`,
    hero: {
      heading: `Read some helpful posts from John Lacombe today!`,
      maxWidth: 652,
    },
    social: [
      {
        name: `facebook`,
        url: `https://www.facebook.com/OdentonBaptist/`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/OdentonBaptist/`,
      },
      {
        name: `twitter`,
        url: `https://twitter.com/OdentonBaptist/`,
      },
      {
        name: `youtube`,
        url: `https://www.youtube.com/channel/UCH1UslOlF165I7_ZhAV-F0g`,
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        authorsPage: true,
        enableComments: process.env.ENABLE_COMMENTS === 'true',
        sources: {
          local: false,
          contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `John Lacombe`,
        short_name: `JohnLacombe`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-metomic`,
      options: {
        clientId: process.env.METOMIC_CLIENT_ID,
      },
    },
  ],
}
