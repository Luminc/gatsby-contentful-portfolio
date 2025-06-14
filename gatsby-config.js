require("dotenv").config({
});

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

module.exports = {
  siteMetadata: {
    title: `Jeroen Kortekaas`,
    author: `Jeroen Kortekaas`,
    keywords: `"Art, Sculpture, Metaxu, Contemplative Research, Devotional Craft, Drawing, Assemblage, Network, Animism, Agency, Infrastructure, Machinic Animism, Philosophy, Contemporary Art, Installation, Interdisciplinary Art, Dutch Artist, Nature-Technology, Autonomy, Distributed Agency"`,
    description: `Jeroen Kortekaas (1991, NL) is an artist whose practice weds contemplative research with the devotional craft of sculpture, drawing, and assemblage. His work explores the metaxu—the dynamic and often equivocal "between" where self and world, nature and technology, agency and passivity meet.`,
    siteUrl: `https://www.jeroenkortekaas.com`,
    eMail: `studio@jeroenkortekaas.com`,
    insta: `https://www.instagram.com/bluecarabiner`,
    instaHandle: `@bluecarabiner`,
    github: "https://github.com/luminc/",
    phone: "+31(0)615245858",
    facebook: "https://www.facebook.com/jeroen.kortekaas.77",
    twitterUsername: "luminc",
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/assets/ico.svg`,
      },
    },
    "gatsby-plugin-mdx",
    `gatsby-plugin-sass`,
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-sitemap",

    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
  ],
};
