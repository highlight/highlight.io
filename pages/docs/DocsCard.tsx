import Link from 'next/link';
import React from 'react';
import { Typography } from '../../components/common/Typography/Typography';
import styles from '../../components/Docs/Docs.module.scss';

// component with children
export const DocsCardGroup = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={styles.docsCardGroup}>
            {children}
        </div>
    );
}

export const DocsCard = ({ children, title, href }: React.PropsWithChildren<{ title: string, href: string }>) => {
    return (
        <Link href={href} className={styles.docsCard}>
            <Typography type='copy2' emphasis>{title}</Typography>
            <Typography type='copy2' >{children}</Typography>
        </Link>
    );
}
