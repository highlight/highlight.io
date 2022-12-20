'use client';

import { Spin } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useComboBox } from 'react-aria';
import Fuse from 'fuse.js';
import Highlighter from 'react-highlight-words';
import { BiSearch } from 'react-icons/bi';
import { Item, useComboBoxState } from 'react-stately';
import ListBox from '../../common/ListBox/ListBox';
import Popover from '../../common/Popover/Popover';
import styles from '../Docs.module.scss';
import { db } from '../../db';
import { DocPath } from '../../../pages/docs/[[...doc]]';
import {
  SEARCH_RESULT_BLURB_LENGTH,
  SearchResult,
} from '../../../pages/api/docs/search/[searchValue]';
import { useRouter } from 'next/router';

const SEARCH_DEBOUNCE_MS = 200;

const DocSearchComboBox = (props: any) => {
  let state = useComboBoxState({ ...props });

  // Setup refs and get props for child elements.
  let inputRef = useRef(null);
  let listBoxRef = useRef(null);
  let popoverRef = useRef(null);

  let { inputProps, listBoxProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  return (
    <div className={styles.searchContainer}>
      <div className={styles.docSearchbar}>
        <BiSearch />
        <input
          {...inputProps}
          ref={inputRef}
          type="text"
          placeholder="Find anything"
        />
      </div>
      {state.inputValue && (
        <Popover
          popoverRef={popoverRef}
          isOpen={state.inputValue}
          onClose={() => {
            state.setInputValue('');
          }}
          popoverClassName={styles.searchDiv}
        >
          {props.isSearchLoading ? (
            <Spin className={styles.spinner} />
          ) : props.hasSearchResults ? (
            <ListBox
              {...listBoxProps}
              listBoxRef={listBoxRef}
              state={state}
              activeClass={props.activeClass}
            />
          ) : (
            <div className={styles.emptyContent}>No results found</div>
          )}
        </Popover>
      )}
    </div>
  );
};

interface SearchbarProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  docPaths: DocPath[];
}

const DocSearchbar = (props: SearchbarProps) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(true);

  const storeDocs = useCallback(async () => {
    await db.docs.clear();
    await db.docs.bulkPut(
      props.docPaths.map((d) => {
        return {
          slug: d.simple_path,
          content: d.content,
          metadata: d.metadata,
        };
      })
    );
  }, [props.docPaths]);

  useEffect(() => {
    storeDocs();
  }, [storeDocs]);

  let onSelectionChange = (idx: number) => {
    const result = searchResults[idx];
    if (result) {
      setSearchResults([]);
      setSearchValue('');
      debouncedResults.cancel();
      router.push(`/docs/${result.path}`).then();
    }
  };

  const onSearchChange = async (e: string) => {
    setIsSearchLoading(true);
    if (e) {
      setSearchValue(e);
      const chars = e.split('');
      const d = await db.docs.toArray();

      const fuse = new Fuse(d, {
        includeScore: true,
        ignoreLocation: true,
        keys: [
          { name: 'metadata.title', weight: 0.8 },
          { name: 'content', weight: 0.2 },
        ],
        includeMatches: true,
        shouldSort: true,
      });
      const docs = fuse.search(e);

      if (docs?.length) {
        setSearchResults(
          docs.map((d) => {
            // console.log('mapping', d.item.metadata.title, d.matches);
            const titleMatch = d.matches?.find(
              (e) => e.key === 'metadata.title'
            );
            const contentMatch = d.matches?.find((e) => e.key === 'content');
            var content = d.item.content;
            if (contentMatch) {
              var minContentIndex = Infinity;
              for (var i of contentMatch.indices) {
                minContentIndex = Math.min(i[0], minContentIndex);
              }
              content = content.slice(
                minContentIndex,
                Math.min(
                  content.length,
                  minContentIndex + SEARCH_RESULT_BLURB_LENGTH
                )
              );
            } else {
              content = content.slice(
                0,
                Math.min(content.length, 0 + SEARCH_RESULT_BLURB_LENGTH)
              );
            }

            return {
              content,
              contentMatch: contentMatch?.indices,
              titleMatch: titleMatch?.indices,
              title: d.item.metadata.title,
              path: d.item.slug,
              indexPath: false,
            };
          })
        );
      }
      setIsSearchLoading(false);
    } else {
      setSearchResults([]);
      setSearchValue('');
      setIsSearchLoading(false);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(onSearchChange, SEARCH_DEBOUNCE_MS);
  }, []);

  return (
    <DocSearchComboBox
      onInputChange={(e: string) => {
        setIsSearchLoading(true);
        debouncedResults(e);
      }}
      onSelectionChange={onSelectionChange}
      hasSearchResults={searchResults.length > 0}
      isSearchLoading={isSearchLoading}
      activeClass={styles.active}
      aria-label="Search bar"
    >
      {searchResults.map((result: SearchResult, i) => (
        <Item key={i} textValue={result.title}>
          <div className={classNames(styles.searchResultCard)}>
            <div>
              <Highlighter
                findChunks={(options) => {
                  return (
                    result.titleMatch?.map((m) => {
                      return { start: m[0], end: m[1] };
                    }) || []
                  );
                }}
                className={styles.resultTitle}
                highlightClassName={styles.highlightedText}
                searchWords={[searchValue]}
                autoEscape={true}
                textToHighlight={result.title}
              />
            </div>
            <div className={styles.content}>
              <Highlighter
                findChunks={(options) => {
                  return (
                    result.contentMatch?.map((m) => {
                      return { start: m[0], end: m[1] };
                    }) || []
                  );
                }}
                highlightClassName={styles.highlightedText}
                searchWords={[searchValue]}
                autoEscape={true}
                textToHighlight={result.content}
              />
            </div>
          </div>
        </Item>
      ))}
    </DocSearchComboBox>
  );
};

export default DocSearchbar;
