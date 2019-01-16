import React from "react"

import styled from "styled-components"
import { createGlobalStyle, css } from "styled-components";
import modernNormalize from "styled-modern-normalize";

const ModernNormalize = createGlobalStyle`
  ${modernNormalize}
`;

const Gallery = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-auto-rows: min-content;
  grid-auto-flow: dense;
  background-color: #191723;
`

const Layout = ({ children }) => (
  <>
    <ModernNormalize />
    <Gallery>
      {children}
    </Gallery>
  </>
)

export default Layout
