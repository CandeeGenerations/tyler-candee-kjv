require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Tyler Candee - Helpful Posts`,
    name: `Tyler Candee`,
    siteUrl: `http://kjv.candeegenerations.com`,
    description: `Posts from Tyler Candee`,
    hero: {
      heading: `Read some helpful posts from Tyler Candee today!`,
      maxWidth: 652,
    },
    social: [
      {
        name: `facebook`,
        url: `https://facebook.com/tyler.candee.kjv`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/tyler.candee.kjv`,
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
        enableComments: true,
        enableNavigation: true,
        sources: {
          local: false,
          contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tyler Candee`,
        short_name: `TylerCandee`,
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
