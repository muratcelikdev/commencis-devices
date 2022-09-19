import PageLayout from 'components/page-layout';

import GlobalStyle from 'theme/GlobalStyle';

import Routes from 'routes/Routes';

const App = (): JSX.Element => {
    return (
        <>
            <GlobalStyle />
            <PageLayout>
                <Routes />
            </PageLayout>
        </>
    );
};

export default App;
