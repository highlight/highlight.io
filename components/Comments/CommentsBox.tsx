import { PrimaryButton } from "../common/Buttons/PrimaryButton"
import { Typography } from "../common/Typography/Typography"
import type { Comment } from "./Comments"

export const CommentsBox = function () {
  const comments: Comment[] = [{
    id: '123asdf',
    email: 'jay@highlight.io',
    name: 'Jay Khatri',
    text: 'good morning',
    created_at: new Date(),
    blog_id: 'aws-msk-kafka-guide'
  }]
  const numComments = comments.length
  return (
    <div className="w-full flex justify-center">
      <div className="grid-flow-row w-[810px]">
        <div className="col-4">
          <div className="w-full flex justify-between">
            <Typography type="copy1">Comments ({numComments})</Typography>
            <PrimaryButton
              href="https://app.highlight.io/?sign_up=1"
              style={{ color: 'black' }}
            >
              <Typography type="copy2" emphasis={true}>
                New Comment
              </Typography>
            </PrimaryButton>
          </div>
        </div>
        <div className="col-4">
          <div className="w-full">
            {comments.map((c) => <div key={c.id} className="flex w-full gap-4">
              <div>circle</div>
              <div className="flex flex-col">
                <Typography type="copy2" >
                  {c.name}
                </Typography>
                <Typography type="copy2" >
                  {c.email}
                </Typography>
                <Typography type="copy2" >
                  {c.text}
                </Typography>
                <div>upvote</div>
              </div>
            </div>)}
          </div>
        </div>
        <div className="col-4">
          <div className="w-full flex justify-center">
            new comment form
          </div>
        </div>
      </div>
    </div>
  )
}
