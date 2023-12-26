import { Layout } from './Layout';
import { PageProps } from '../types';

interface ErrorPageProps extends PageProps {
  error: Error | string;
}

export const ErrorPage = ({ title, error }: ErrorPageProps) => (
  <Layout title={title}>
    <h2>Unhandled error</h2>
    <p>An unexpected error occurred.</p>
    <code>{error}</code>
  </Layout>
);
