import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Gallery from "../components/gallery"

import qs from "qs"

const Index = ({data , location }) => {
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const base42_data = {
    galleryTall: data.galleryTall,
    galleryWide: data.galleryWide,
    galleryBig: data.galleryBig,
    galleryNormal: data.galleryNormal
  }

  const base42webp_data =  {
    galleryTall: data.galleryTall_base64webp,
    galleryWide: data.galleryWide_base64webp,
    galleryBig: data.galleryBig_base64webp,
    galleryNormal: data.galleryNormal_base64webp
  }

  return (
  <Layout>
      <Gallery
        data={params.base64webp ? base42webp_data : base42_data}
        blur={params.blur}
        bg={params.bg}
      />
  </Layout>
)}

export default Index


export const query = graphql`
query{
  galleryTall: allUnsplashImagesYaml(filter: {image_type: {eq: "tall"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxHeight: 800, base64Width: 42) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  galleryWide: allUnsplashImagesYaml(filter: {image_type: {eq: "wide"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxWidth: 800, base64Width: 42) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  galleryBig: allUnsplashImagesYaml(filter: {image_type: {eq: "big"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxHeight: 800, base64Width: 42) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  galleryNormal: allUnsplashImagesYaml(filter: {image_type: {eq: "normal"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxWidth: 550, base64Width: 42) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }

  
  galleryTall_base64webp: allUnsplashImagesYaml(filter: {image_type: {eq: "tall"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxHeight: 800, base64Width: 42, toFormatBase64: WEBP) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  galleryWide_base64webp: allUnsplashImagesYaml(filter: {image_type: {eq: "wide"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxWidth: 800, base64Width: 42, toFormatBase64: WEBP) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  galleryBig_base64webp: allUnsplashImagesYaml(filter: {image_type: {eq: "big"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxHeight: 800, base64Width: 42, toFormatBase64: WEBP) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  galleryNormal_base64webp: allUnsplashImagesYaml(filter: {image_type: {eq: "normal"}}) {
    edges {
      node {
        image_id
        image_type
        localFile {
          childImageSharp {
            fluid(maxWidth: 550, base64Width: 42, toFormatBase64: WEBP) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
}
`
