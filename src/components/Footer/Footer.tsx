import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      Made by Hunter Harling
      <a
        rel="noopener noreferrer" 
        target="_blank"
        href="https://github.com/hunterharling/astro-guesser">
        <span>{" <"}</span>
        github.com/hunterharling
        <span>{">"}</span>
      </a>
    </div>
  );
}

export default Footer;