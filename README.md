Try use the URL query params bg, blur and base64webp, all booleans. eg `?bg=true&blur=true&base64webp=true`. 

In `develop` all three params will work:

- ` blur` will apply additional style blurring the placeholder images, 
- `bg` will add an additional div with a background-color applied(from `gatsby-image`)
- `base64webp` will swap out the base64 data for the placeholder image `src` field from the jpeg base64 data.

However when running `gatsby build`, note that only the `bg` param has any effect. If `<Link>` was used to navigate to other pages client-side(vs direct url loading of a page) once hydration into a React app occurs, the other two query params should work correctly? This functional behaviour disparity is only when accessing a page directly via the URL to it's index.html, due to React apps not adjusting element attributes(`style,` and `src` in this case), but only elements, of the prior HTML content.