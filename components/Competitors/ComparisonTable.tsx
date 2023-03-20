import Image from 'next/image'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'
import logrocketlogofull from '../../public/images/logrocketlogofull.png'
import { HighlightLogo } from '../common/HighlightLogo/HighlightLogo'
import { Typography } from '../common/Typography/Typography'
import { ComparisonTableRow, ComparisonTableSection, Competitor } from './competitors'

export default function ComparisonTable(props: { competitor: Competitor }) {
  if (!props.competitor) {
    return <div>No Competitor Loaded</div>
  }

  return (
    <div className="">
      {props.competitor.sections.map((section: ComparisonTableSection, i) => (
        <div key={`${section.title}` + `${i}`} className="w-full mb-8">
          <div className="flex justify-between mb-2 items-end">
            <Typography type="copy1" className="text-white" emphasis>
              {section.title}
            </Typography>
            <div className={`${i == 0 ? 'md:flex' : ''} hidden items-center`}>
              <div className="w-[200px] pl-2">
                <HighlightLogo />
              </div>
              <div className="w-[200px]">
                <Image src={logrocketlogofull} alt="LogRocket Logo" />
              </div>
            </div>
          </div>
          {section.rows.map((row: ComparisonTableRow, j) => (
            <div key={`${row.feature}` + `${j}`} className="flex w-full justify-between items-center">
              <Typography type="copy2" className="text-copy-on-dark">
                {row.feature}
              </Typography>
              <div className="flex">
                <div
                  className={`bg-divider-on-dark px-2 py-2 w-[50px] md:w-[200px] border-r-[1px] border-copy-on-light ${
                    j == 0 ? 'rounded-tl-lg' : j == section.rows.length - 1 ? 'rounded-bl-lg' : ''
                  }`}
                >
                  {row.highlight == 1 ? (
                    <HiCheckCircle className="text-copy-on-dark h-7 w-7" />
                  ) : (
                    <div className="flex gap-1">
                      <HiXCircle className="text-copy-on-light h-7 w-7" />
                      {row.highlight == 0.5 && (
                        <div className="hidden md:flex items-center bg-copy-on-light px-3 rounded-full">
                          <Typography type="copy4" emphasis className="text-copy-on-dark rounded-full">
                            Coming soon
                          </Typography>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div
                  className={`bg-divider-on-dark px-2 py-2 w-[50px] md:w-[200px] ${
                    j == 0 ? 'rounded-tr-lg' : j == section.rows.length - 1 ? 'rounded-br-lg' : ''
                  }`}
                >
                  {row.competitor ? (
                    <HiCheckCircle className="text-copy-on-dark h-7 w-7" />
                  ) : (
                    <HiXCircle className="text-copy-on-light h-7 w-7" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
