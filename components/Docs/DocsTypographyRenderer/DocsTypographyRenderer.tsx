import styles from '../Docs.module.scss';
import { useRouter } from 'next/router';
import { HeroVideo } from '../../Home/HeroVideo/HeroVideo';
import { Callout } from '../Callout/Callout';
import { HighlightCodeBlock } from '../HighlightCodeBlock/HighlightCodeBlock';
import Link from 'next/link';
import { BiLink } from 'react-icons/bi';
import { createElement } from 'react';
import classNames from 'classnames';

const getIdFromHeaderProps = (props: any) => {
  return props?.node?.children
    .map((child: any) =>
      child.tagName === 'code' ? child?.children[0].value : child.value
    )
    .join('')
    .replace(/[^a-zA-Z ]/g, '')
    .trim()
    .split(' ')
    .join('-');
};

const copyHeadingIcon = (index: number) => {
  return (
    <span className={styles.headingCopyIcon} key={index}>
      <BiLink />
    </span>
  );
};

const resolveLink = (href: string): string => {
  if (href.startsWith('/')) {
    return `/docs${href}`;
  }
  return href;
};

export const DocsMarkdownRenderer = (
  renderType: 'h5' | 'h6' | 'code' | 'a' | 'div'
) => {
  function DocsTypography({ ...props }) {
    const router = useRouter();
    return (
      <>
        {renderType === 'code' ? (
          props && props.children && props.inline ? (
            <code className={styles.inlineCodeBlock}>{props.children[0]}</code>
          ) : props.className === 'language-hint' ? (
            <Callout content={props.children[0]} />
          ) : (
            <HighlightCodeBlock
              language={'js'}
              text={props.children[0]}
              showLineNumbers={false}
            />
          )
        ) : renderType === 'a' ? (
          props.children?.length && (
            <Link href={resolveLink(props.href)} legacyBehavior>
              {props.children[0]}
            </Link>
          )
        ) : (
          createElement(
            renderType,
            {
              className: styles.contentRender,
              ...(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(renderType)
                ? {
                    id: props.id,
                    onClick: () => {
                      const basePath = router.asPath.split('#')[0];
                      router.push(`${basePath}#${props.id}`);
                    },
                  }
                : {}),
            },
            [
              ...props?.children.map((c: any, i: number) =>
                c.props
                  ? createElement(
                      'code',
                      { key: i, className: styles.inlineCodeBlock },
                      c?.props.children
                    )
                  : c
              ),
              copyHeadingIcon(props?.children?.length ?? 0),
            ] || ''
          )
        )}
      </>
    );
  }

  return DocsTypography;
};

export const MethodParameterRenderer = (renderType: 'h5' | 'code' | 'a') => {
  function DocsTypography({ ...props }) {
    const router = useRouter();
    return (
      <>
        {renderType === 'code' ? (
          props && props.children && props.inline ? (
            <code className={styles.inlineCodeBlock}>{props.children[0]}</code>
          ) : (
            <HighlightCodeBlock
              language={'js'}
              text={props.children[0]}
              showLineNumbers={false}
            />
          )
        ) : renderType === 'a' ? (
          props.children?.length && (
            <Link href={resolveLink(props.href)} legacyBehavior>
              {props.children[0]}
            </Link>
          )
        ) : (
          createElement(
            renderType,
            {
              className: classNames(styles.contentRender),
              ...(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(renderType)
                ? {
                    id: props.id,
                    onClick: () => {
                      const basePath = router.asPath.split('#')[0];
                      router.push(`${basePath}#${props.id}`);
                    },
                  }
                : {}),
            },
            [
              ...props?.children.map((c: any, i: number) =>
                c.props
                  ? createElement(
                      'code',
                      { key: i, className: styles.inlineCodeBlock },
                      c?.props.children
                    )
                  : c
              ),
              copyHeadingIcon(props?.children?.length ?? 0),
            ] || ''
          )
        )}
      </>
    );
  }

  return DocsTypography;
};

export const getDocsTypographyRenderer = (type: 'h5' | 'code' | 'a') => {
  function DocsTypography({ ...props }) {
    const router = useRouter();
    return (
      <>
        {type === 'code' ? (
          props && props.children && props.inline ? (
            <code className={styles.inlineCodeBlock}>{props.children[0]}</code>
          ) : props.className === 'language-welcomevideo' ? (
            <div className={styles.customComponent}>
              <HeroVideo />
            </div>
          ) : props.className === 'language-hint' ? (
            <Callout content={props.children[0]} />
          ) : (
            <HighlightCodeBlock
              language={'js'}
              text={props.children[0]}
              showLineNumbers={false}
            />
          )
        ) : type === 'a' ? (
          props.children?.length && (
            <Link href={resolveLink(props.href)} legacyBehavior>
              {props.children[0]}
            </Link>
          )
        ) : (
          createElement(
            type,
            {
              className: styles.contentRender,
              ...(['h4', 'h5'].includes(type)
                ? {
                    id: getIdFromHeaderProps(props),
                    onClick: () => {
                      const basePath = router.asPath.split('#')[0];
                      router.push(`${basePath}#${getIdFromHeaderProps(props)}`);
                    },
                  }
                : {}),
            },
            [
              ...props?.node?.children.map((c: any, i: number) =>
                c.tagName === 'code'
                  ? createElement(
                      c.tagName,
                      { key: i, className: styles.inlineCodeBlock },
                      c?.children[0].value
                    )
                  : c.value
              ),
              copyHeadingIcon(props?.node?.children?.length ?? 0),
            ] || ''
          )
        )}
      </>
    );
  }

  return DocsTypography;
};
