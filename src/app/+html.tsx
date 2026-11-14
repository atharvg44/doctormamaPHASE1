import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { height: 100%; background: #D6C9AE; }
              ::selection { background: #E8DBC0; color: #1A1409; }
              /* Printed-page underlines sit clear of the Devanagari matras. */
              * { text-underline-offset: 3px; text-decoration-thickness: 1.5px; }
              ::-webkit-scrollbar { width: 10px; height: 10px; }
              ::-webkit-scrollbar-track { background: transparent; }
              ::-webkit-scrollbar-thumb { background: rgba(26, 20, 9, 0.28); }
              body { margin: 0; -webkit-tap-highlight-color: transparent; }
              #root { display: flex; height: 100%; }

              /* The browser's own orange focus ring lands inside our field
                 rule and reads as an error state. The field already draws its
                 own ink focus rule, so suppress the UA one for text entry. */
              input, textarea, [contenteditable] {
                outline: none !important;
                caret-color: #1A1409;
              }

              /* Everything else keeps a visible keyboard focus ring — it is
                 the only affordance a switch or keyboard user has. */
              [role="button"]:focus-visible,
              [role="radio"]:focus-visible,
              [role="link"]:focus-visible,
              a:focus-visible {
                outline: 3px solid #1A1409;
                outline-offset: 2px;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
