import logo from '../../images/logo.png'
import githubImg from '../../images/github-mark.png'

import "./Footer.css"

function Footer() {
  return (
    <footer id="main-footer">
      <div id="copyright-stuff">
        <img className="small-logo" src={logo} alt="logo" />
        <h6>DragonMaster's Codex</h6>
        <p>&copy;2023 DragonMaster's Codex</p>
      </div>

      <div id="social-stuff">
        <a className="social-link">
          <img className="social-img" src={githubImg} alt="Github"/>
        </a>
      </div>
    </footer>
  )
}

export default Footer