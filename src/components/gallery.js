import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"

const GridCell = styled(Img)`
  ${props => props.type == 'wide' && `grid-column: span 2;max-height: 350px;`} //width max 800
  ${props => props.type == 'tall' && `grid-row: span 2;min-height:450px;`} //height max 800
  ${props => props.type == 'big' && `grid-column: span 2;grid-row: span 2;max-height: 705px;`} //width max 800
  ${props => props.type == 'normal' && `max-height:350px;`} //width max 550

  // backgroundColor placeholder, add image icon
  div + div {
      background: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxyZWN0IHg9IjIiIHk9IjEiIHN0eWxlPSJmaWxsOiM0MjRBNjA7c3Ryb2tlOiNFN0VDRUQ7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB3aWR0aD0iNDgiIGhlaWdodD0iNTAiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRUZDRTRBOyIgY3g9IjE0IiBjeT0iMTMuNTY5IiByPSI0LjU2OSIvPgo8cmVjdCB4PSIyIiB5PSI0MSIgc3R5bGU9ImZpbGw6I0U3RUNFRDsiIHdpZHRoPSI0OCIgaGVpZ2h0PSIxMCIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojMUE5MTcyOyIgcG9pbnRzPSI0OSwzMi4xMTEgNDgsMzEgMzYsMjAgMjUuNSwzMS41IDMwLjk4MywzNi45ODMgMzUsNDEgNDksNDEgIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiMyNUFFODg7IiBwb2ludHM9IjMwLjk4MywzNi45ODMgMjAuMDE3LDI2LjAxNyAzLDQxIDM1LDQxICIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K) no-repeat center;
      background-size: 64px 64px;
      filter: grayscale(50%)
  }

  &:hover {
    div + img, div + div {
      opacity: 1 !important;
      transition: none !important;
    }

    img + picture > img {
      opacity: 0 !important;
    }
  }
`

const transform_nodes = ({node}) => {
      return {
      image_id: node.image_id,
      image_type: node.image_type,
      fluid: node.localFile.childImageSharp.fluid
  }};

const getAndSort = (data) => {
    const {galleryTall, galleryWide, galleryBig, galleryNormal} = data
    return [...galleryTall.edges, ...galleryWide.edges, ...galleryBig.edges, ...galleryNormal.edges]
        // prevents failure when remote content failed to download locally or processing by sharp
        .filter(({node}) => node.localFile && node.localFile.childImageSharp)
        // flatten the node object to only contain what we need
        .map(transform_nodes)
        // get original desired order back for all types mixed together
        .sort((a,b) =>  (a.image_id - b.image_id))
}

const Gallery = (props) => {
  const image_nodes = getAndSort(props.data)

  return (
  <>
      {image_nodes.map((image, i) =>
        <GridCell key={i}
          type={image.image_type}
          fluid={image.fluid}
          placeholderStyle={props.blur && {
            filter: `blur(8px)`,
            transform: `scale(1.04)`,
          }}
          backgroundColor={props.bg && "#333"}
        />
      )}
  </>
)}

export default Gallery
