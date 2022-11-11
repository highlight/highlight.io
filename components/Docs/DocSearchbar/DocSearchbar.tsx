'use client';

import { Spin } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import Link from 'next/link';
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(true);

  const storeDocs = useCallback(() => {
    return db.docs.bulkPut(
      props.docPaths.map((d) => ({
        slug: d.simple_path,
        content: d.content,
        metadata: d.metadata,
      }))
    );
  }, [props.docPaths]);

  useEffect(() => {
    storeDocs();
  }, [storeDocs]);

  let onSelectionChange = () => {
    setTimeout(() => {
      setSearchResults([]);
      setSearchValue('');
    }, 300);
    debouncedResults.cancel();
  };

  const onSearchChange = async (e: any) => {
    setIsSearchLoading(true);
    if (e) {
      setSearchValue(e);
      const docs = await db.docs
        .filter(
          (doc) => doc.content.toLowerCase().indexOf(e.toLowerCase()) !== -1
        )
        .toArray();
      if (docs?.length) {
        setSearchResults(
          docs.map((d) => {
            const idx = d.content.indexOf(e);
            return {
              content: d.content.slice(
                idx - SEARCH_RESULT_BLURB_LENGTH / 2,
                idx + SEARCH_RESULT_BLURB_LENGTH / 2
              ),
              title: d.metadata.title,
              path: d.slug,
              indexPath: false,
            };
          })
        );
      } else {
        const results = await (await fetch(`/api/docs/search/${e}`)).json();
        setSearchResults(results);
      }
      setIsSearchLoading(false);
    } else {
      setSearchResults([]);
      setSearchValue('');
      setIsSearchLoading(false);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(onSearchChange, 300);
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
          <Link href={`/docs/${result.path}`} legacyBehavior>
            <div
              className={classNames(styles.searchResultCard)}
              onClick={() => setSearchValue('')}
            >
              <div>
                <Highlighter
                  className={styles.resultTitle}
                  highlightClassName={styles.highlightedText}
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={result.title}
                />
              </div>
              <div className={styles.content}>
                <Highlighter
                  highlightClassName={styles.highlightedText}
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={result.content}
                />
              </div>
            </div>
          </Link>
        </Item>
      ))}
    </DocSearchComboBox>
  );
};

export default DocSearchbar;
