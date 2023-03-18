import classNames from 'classnames'
import { BsGithub } from 'react-icons/bs'
import styles from '../../Home/Home.module.scss'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { Typography } from '../Typography/Typography'
import { Issue, labels, RoadmapProps, tagToTitle } from './RoadmapUtils'

export const Roadmap = (content: { content: RoadmapProps }) => {
  let data = content.content

  return (
    <>
      <PrimaryButton className="inline-block py-1 mt-4 items-center">
        <BsGithub className="inline-block mr-2 mb-[2px] h-[15px] " />
        <Typography type="copy3" emphasis>
          Submit a Feature Request
        </Typography>
      </PrimaryButton>
      <div className="border-[1px] border-divider-on-dark my-10 w-[300px]" />
      <div className="flex flex-col xl:flex-row w-full">
        <RoadmapColumn
          title="Under Consideration"
          subTitle="The features and improvements on our radar. Feel free to contribute."
          issues={data?.column1 || []}
        />
        <RoadmapColumn
          title="In Progress"
          subTitle="Check out what we're currently bringing to life."
          issues={data?.column2 || []}
        />
        <RoadmapColumn title="Shipped 🚢" subTitle="What we've delivered so far." issues={data?.column3 || []} />
      </div>
    </>
  )
}

const RoadmapColumn = ({ title, subTitle, issues }: { title: string; subTitle: string; issues: Issue[] }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col h-[100px] mb-8 gap-2">
        <Typography type="copy1" emphasis>
          {title}
        </Typography>
        <Typography type="copy3" className="w-10/12 text-copy-on-dark">
          {subTitle}
        </Typography>
      </div>
      <div className="flex flex-col gap-8">
        {labels.map((label, index) => (
          <RoadmapCategory key={index} label={label} items={issues} />
        ))}
      </div>
    </div>
  )
}

const RoadmapCategory = ({ label, items }: { label: string; items: Issue[] }) => {
  let filteredItems = items.filter((item) => item.labels.includes(label))

  if (filteredItems.length === 0) {
    return null
  }

  return (
    <div className="w-11/12 text-center border-[1px] border-divider-on-dark rounded-lg">
      <div className="py-2">
        <Typography type="copy3" emphasis>
          {tagToTitle(label)}
        </Typography>
      </div>
      {filteredItems.map((item, index) => (
        <RoadmapItem key={index} {...item} />
      ))}
    </div>
  )
}

const RoadmapItem = ({ title, number, link, linkText, issueReactions }: Issue) => {
  return (
    <div className="flex flex-col gap-2 pt-3 border-t-[1px] border-divider-on-dark text-start px-4">
      <Typography type="copy4" emphasis className="text-copy-on-dark">
        {title} <span className="text-copy-on-light ml-1">#{number}</span>
      </Typography>

      <div className="flex gap-4">
        {issueReactions &&
          issueReactions.map((reaction, index) => (
            <div key={index} className="flex gap-1 items-center">
              <Typography type="copy3" emphasis className="text-copy-on-dark">
                {reaction.content}
              </Typography>
              <Typography type="copy4" emphasis className="text-copy-on-dark">
                {reaction.count}
              </Typography>
            </div>
          ))}
      </div>

      {link && (
        <div className="inline-block">
          <PrimaryButton className={classNames('inline-block py-1 mt-2 items-center mb-4', styles.hollowButton)}>
            <div className="flex items-center gap-2">
              <BsGithub className="mb-[2px] h-[15px] " />
              <Typography type="copy3" emphasis>
                {linkText}
              </Typography>
            </div>
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
