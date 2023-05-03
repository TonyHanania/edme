import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  :root {
max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  }
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');
  html, body, div, span, applet, object, iframe,
    blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center, p,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, button {
        margin: 0;
        padding: 0;
        border: 0;
        /* font-size: 65%; */
        font-family: "Merriweather" ;
        /* font: inherit; */
        vertical-align: baseline;
    }
  html{
    font-size: 70%;
  }
  @media (min-width: 500px) {
html{
  font-size: 60%;
}
  }

  @media (min-width: 600px) {
html{
  font-size: 70%;
}
  }
  @media (min-width: 900px) {
html{
  font-size: 80%;
}


  }

  @media (min-width: 1200px) {
html{
  font-size: 90%;
}

@media (min-width: 1400px) {
html{
  font-size: 100%;
}
}


  }
`;
