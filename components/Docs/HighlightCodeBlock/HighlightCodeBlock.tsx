import styles from '../Docs.module.scss';
import { CodeBlock } from 'react-code-blocks';
import { PropsWithChildren, useState, Fragment, Key } from 'react';
import highlightCodeTheme from '../../../components/common/CodeBlock/highlight-code-theme';
import Image from 'next/legacy/image';
import CopyIcon from '../../../public/images/document-duplicate.svg';
import CheckmarkIcon from '../../../public/images/checkmark_circle.svg';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

export const HighlightCodeBlock = (props: PropsWithChildren<any>) => {
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState(0)
  return (
    <div className={styles.codeBlock}>
      {props.topbar &&
        <div className={styles.codeBlockTopper}>
          {props.types && <div className="w-36 ml-6 mt-3">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-dark-background py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{props.types[selected]}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {props.types.map((type: string, index: Key) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={type}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {type}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>}
        </div>
      }
      <CodeBlock
        language={props.language}
        text={props.text}
        showLineNumbers={props.showLineNumbers}
        theme={highlightCodeTheme}
      />
      <div
        className={classNames(styles.codeCopyIcon, `${props.topbar ? "mt-9" : ""}`)}
        onClick={() => {
          navigator.clipboard.writeText(props.text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
      >
        <Image src={CopyIcon} alt="Copy" />
      </div>
      {copied && (
        <div className={classNames(styles.codeCopyIcon, styles.active)}>
          <Image src={CheckmarkIcon} alt="Text Copied" />
        </div>
      )}
    </div>
  );
};
