require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Carissa Candee`,
    name: `Carissa Candee`,
    siteUrl: `https://cj.cgen.cc`,
    description: `Posts from Carissa Candee`,
    hero: {
      heading: `Read some helpful posts from Carissa Candee today!`,
      maxWidth: 652,
    },
    social: [
      {
        name: `facebook`,
        url: `https://facebook.com/mommasize`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/cjblitzz`,
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
        sources: {
          local: false,
          contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carissa Candee`,
        short_name: `CarissaCandee`,
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
