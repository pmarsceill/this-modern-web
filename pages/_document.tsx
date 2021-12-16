import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { getCssText } from '../stitches.config'

const PageDocument = class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />

          {/* Avoid Flash of Default Theme */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
                function setTheme(newTheme) {
                  document.html.className = newTheme;
                  window.__theme = newTheme;
                  window.__onThemeChange(newTheme);
                }
                window.__onThemeChange = function () {};
                window.__setPreferredTheme = function (newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem("theme", JSON.stringify(window.__theme));
                  } catch (err) {}
                };
                const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
                darkQuery.addListener(function (event) {
                  window.__setPreferredTheme(event.matches ? "dark-theme" : "light-theme");
                });
                let preferredTheme;
                try {
                  preferredTheme = JSON.parse(localStorage.getItem("theme"));
                } catch (err) {}
                setTheme(preferredTheme || (darkQuery.matches ? "dark-theme" : "light-theme"));
              })();
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default PageDocument
