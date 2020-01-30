// Base template view.
import { EmptyState, Layout, Page } from '@shopify/polaris';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = () => (
    <Page>
        <Layout>
            <EmptyState
                heading="Shopify Custom App"
                action={{
                    content: 'Visit arciniega.dev',
                    onAction: () => window.location.href='https://arciniega.dev/',
                }}
                image={img}
            >
                <p>Main template.</p>
            </EmptyState>
        </Layout>
    </Page>
);

// Export this view.
export default Index;