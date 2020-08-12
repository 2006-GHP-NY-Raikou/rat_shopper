import React from 'react'
import {GoMarkGithub} from 'react-icons/go'
import {AiOutlineLinkedin} from 'react-icons/ai'

const Footer = () => (
  <div id="footer">
    <div className="footerHalf">
      <div className="ratShopper">Rat Shopper</div>
      <h3>
        Your one-stop shop for adopting pet rats and dressing them to the nines!
      </h3>
      <div>
        <a href="https://github.com/2006-GHP-NY-Raikou/rat_shopper">
          <GoMarkGithub color="##e36397" size={32} /> GitHub
        </a>
      </div>
    </div>
    <div className="footerHalf">
      <a href="https://www.linkedin.com/in/cecilia-yu-chung-chang/">
        <AiOutlineLinkedin size={25} /> Cecilia Yu Chung Chang
      </a>
      <a href="https://www.linkedin.com/in/elizabeth-john-630b761a7/">
        <AiOutlineLinkedin size={25} /> Liz John
      </a>
      <a href="https://www.linkedin.com/in/natalie-ng-a812a811b/">
        <AiOutlineLinkedin size={25} /> Natalie Ng
      </a>
      <a href="https://www.linkedin.com/in/emma-seely-katz-b4386a1a3/">
        <AiOutlineLinkedin size={25} /> Emma Seely-Katz
      </a>
      <h2>August 2020</h2>
    </div>
  </div>
)

export default Footer
