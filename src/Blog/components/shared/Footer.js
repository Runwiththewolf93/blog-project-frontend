function Footer() {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com/"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f" />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://twitter.com/"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.google.com/"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-google" />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.instagram.com/"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" />
          </a>
        </section>
      </div>
      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {new Date().getFullYear()} Copyright: Stevan Zivanovic
      </div>
    </footer>
  );
}

export default Footer;
