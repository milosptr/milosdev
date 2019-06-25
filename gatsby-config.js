module.exports = {
  siteMetadata: {
    title: `Milos | Full Stack Web Developer`,
    description: `I’m Milos, a 22 years old self-taught Full Stack Web developer, from Serbia.`,
    author: `Milos | Inspiration by Fidalgo`,
    siteUrl: 'http://www.milosptr.dev/',
    social: {
      instagram: 'somizmatika',
      linkedin: 'petrovic-milos',
      facebook: 'shomyp',
      github: 'milosptr',
      email: 'hello@milosptr.dev',
    },
    // name of the image for social website share, should be in static folder
    imageShare: `share.jpg`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-142461568-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
      },
    },
    `gatsby-plugin-use-dark-mode`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: [`200`, `400`, `400i`, `600`, `600i`, `700`],
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Milos | Full Stack Web Developer`,
        short_name: `Milos`,
        icon: `src/images/icon.png`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#7f3f97`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
