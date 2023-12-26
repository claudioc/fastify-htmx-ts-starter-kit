import { Layout } from './Layout';
import { PageProps } from '../types';

export const NotFoundPage = ({ title }: PageProps) => (
  <Layout title={title}>
    <h2>Page not found</h2>
    <p>The requested page was not found.</p>
  </Layout>
);
