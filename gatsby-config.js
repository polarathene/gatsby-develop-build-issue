module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-no-sourcemaps`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-remote-images`,
      options: {
        filter: node => node.internal.type === `UnsplashImagesYaml`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        //base64Width: 42,
        forceBase64Format: `jpeg`,
        useMozJpeg: false,
        stripMetadata: true,
      },
    },
  ],
}
