/*
Next.js uses an App component to pass down classes to the other files in your app. 
This saves you from having to add imports to each file. 
You’ll set up an _app.js file that passes down the Polaris components, styles, and everything else typically found in an index file.
*/
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';

// App component.
class CustomApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                <AppProvider i18n={translations}>
                    <Component {...pageProps} />
                </AppProvider>
            </React.Fragment>
        );
    }
}

export default CustomApp;