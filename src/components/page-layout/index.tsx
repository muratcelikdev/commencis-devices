import { PropsWithChildren } from 'react';

import * as S from 'components/page-layout/index.styles';

const PageLayout = ({ children }: PropsWithChildren): JSX.Element => {
    return <S.Layout>{children}</S.Layout>;
};

export default PageLayout;
