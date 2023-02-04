import Typography from 'antd/lib/typography';
import Link from 'next/link';
import { Collapse } from 'react-collapse';
import styles from '../../components/Docs/Docs.module.scss';
import classNames from 'classnames';

export const BlogLayout = () => {
    return (
        <main className={styles.mainWrapper}>
            <div className={styles.leftSection}>
                <div className={styles.tocMenuLarge}>
                    {isSdkDoc ? (
                        <SdkTableOfContents />
                    ) : (
                        toc?.children.map((t) => (
                            <TableOfContents
                                key={t.docPathId}
                                toc={t}
                                docPaths={docOptions}
                                openParent={false}
                                openTopLevel={true}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

const SdkTableOfContents = () => {
    const { nestedHeadings } = useHeadingsData('h4');
    const router = useRouter();
    const [activeId, setActiveId] = useState<string>();
    useIntersectionObserver(setActiveId);

    useEffect(() => {
        const selectedId = router.asPath.split('#');
        if (selectedId.length > 1) {
            document.querySelector(`#${selectedId[1]}`)?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [router.asPath]);

    return (
        <>
            {nestedHeadings.map((heading: HTMLHeadingElement, i: number) => (
                <Link href={`#${heading.id}`} key={i} legacyBehavior>
                    <div
                        className={styles.tocRow}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector(`#${heading.id}`)?.scrollIntoView({
                                behavior: 'smooth',
                            });
                            const basePath = router.asPath.split('#')[0];
                            const newUrl = `${basePath}#${heading.id}`;
                            window.history.replaceState(
                                {
                                    ...window.history.state,
                                    as: newUrl,
                                    url: newUrl,
                                },
                                '',
                                newUrl
                            );
                        }}
                    >
                        <Minus
                            className={classNames(styles.tocIcon, styles.tocChild, {
                                [styles.tocItemCurrent]: heading.id === activeId,
                            })}
                        />
                        <Typography
                            type="copy3"
                            className={classNames(styles.tocItem, styles.tocChild, {
                                [styles.tocItemCurrent]: heading.id === activeId,
                            })}
                        >
                            {heading.innerText || 'nope'}
                        </Typography>
                    </div>
                </Link>
            ))}
        </>
    );
};
const TableOfContents = ({
    toc,
    docPaths,
    openParent,
    openTopLevel = false,
}: {
    toc: TocEntry;
    openParent: boolean;
    openTopLevel?: boolean;
    docPaths: DocPath[];
}) => {
    const [open, setOpen] = useState(openTopLevel || openParent);
    const hasChildren = !!toc?.children.length;

    const [isCurrentPage, setIsCurrentPage] = useState(false);
    const isTopLevel =
        toc.tocSlug === docPaths[toc.docPathId || 0]?.array_path[0];

    useEffect(() => {
        setOpen(isTopLevel && openTopLevel);
    }, [isTopLevel, openTopLevel]);

    useEffect(() => {
        const currentPage = path.join(
            '/docs',
            docPaths[toc.docPathId || 0]?.simple_path || ''
        );
        setIsCurrentPage(currentPage === window.location.pathname);
        const isParentOfCurrentPage = window.location.pathname.includes(
            docPaths[toc.docPathId || 0]?.simple_path
        );
        setOpen((prevOpenState) => prevOpenState || isParentOfCurrentPage);
    }, [docPaths, toc.docPathId]);

    return (
        <div className='max-w-full'>
            {hasChildren ? (
                <div className={styles.tocRow} onClick={() => setOpen((o) => !o)}>
                    <ChevronDown
                        className={classNames(styles.tocIcon, {
                            [styles.tocItemChevronClosed]: hasChildren && !open,
                            [styles.tocItemOpen]: hasChildren && open,
                            [styles.tocItemCurrent]: !hasChildren && open && isCurrentPage,
                            [styles.tocChild]: !isTopLevel,
                        })}
                    />
                    <Typography
                        type="copy3"
                        emphasis={isTopLevel}
                        className={classNames(styles.tocItem, {
                            [styles.tocItemOpen]: hasChildren && open,
                            [styles.tocItemCurrent]: (!hasChildren || open) && isCurrentPage,
                            [styles.tocChild]: !isTopLevel,
                        })}
                    >
                        {toc?.tocHeading || 'nope'}
                    </Typography>
                </div>
            ) : (
                <Link
                    href={path.join(
                        '/docs',
                        docPaths[toc.docPathId || 0]?.simple_path || ''
                    )}
                    legacyBehavior
                >
                    <div
                        className={styles.tocRow}
                        onClick={() => {
                            setOpen((o) => !o);
                            if (window.scrollY >= 124) {
                                sessionStorage.setItem('scrollPosition', '124');
                            } else {
                                sessionStorage.setItem('scrollPosition', '0');
                            }
                        }}
                    >
                        <Minus
                            className={classNames(styles.tocIcon, {
                                [styles.tocItemOpen]: hasChildren,
                                [styles.tocItemCurrent]: !hasChildren && isCurrentPage,
                                [styles.tocChild]: !isTopLevel,
                            })}
                        />
                        <Typography
                            type="copy3"
                            emphasis={isTopLevel}
                            className={classNames(styles.tocItem, {
                                [styles.tocItemOpen]: hasChildren && open,
                                [styles.tocItemCurrent]:
                                    (!hasChildren || open) && isCurrentPage,
                                [styles.tocChild]: !isTopLevel,
                            })}
                        >
                            {toc?.tocHeading || 'nope'}
                        </Typography>
                    </div>
                </Link>
            )}
            <Collapse isOpened={open}>
                <div className={styles.tocChildren}>
                    <div className={styles.tocChildrenLineWrapper}>
                        <div className={styles.tocChildrenLine}></div>
                    </div>
                    <div className={styles.tocChildrenContent}>
                        {toc?.children.map((t) => (
                            // TODO(jaykhatri) - this 'docPaths' concept has to be stateful 🤔.
                            <TableOfContents
                                openParent={open && !isTopLevel}
                                docPaths={docPaths}
                                key={t.docPathId}
                                toc={t}
                            />
                        ))}
                    </div>
                </div>
            </Collapse>
        </div>
    );
};
