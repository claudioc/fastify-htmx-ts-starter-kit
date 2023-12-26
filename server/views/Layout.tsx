import { JSX } from 'preact';
import { cssFile } from '../lib/assets';
import { PageProps } from '../types';

interface LayoutProps extends PageProps {
  children: string | JSX.Element[] | JSX.Element;
}

export const Layout = ({ title, children }: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Yet another starter kit - {title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Yet another starter kit" />
      <link rel="stylesheet" href={cssFile} />
    </head>
    <body class="container">
      <main class="row">
        <div class="col">
          <h1>Welcome to yet another starter kit!</h1>
          {children}
        </div>
      </main>
    </body>
  </html>
);
