import { createClient } from '@supabase/supabase-js'
import { useEffect, useCallback, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

const Channel = 'blog-posts'

const supabase = createClient(
  'https://zegkgkeylxjinmkhvszq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDYwOTE1MiwiZXhwIjoxOTUwMTg1MTUyfQ.Hk_ghyYR5dVn5ILfdB5iFX5vxQnwIBwegWJcp7TJloE',
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  },
)

interface Comment {
  id: string
  created_at: Date
  blog_id: string
  name?: string
  email?: string
  text?: string
  vote?: number
}

export const Comments = function ({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [currentCommentText, setCurrentCommentText] = useState<string>('')

  const shouldAddComment = useCallback(
    (comment: Comment): boolean => {
      const seen = new Set<string>()
      comments.forEach((c) => seen.add(c.id))
      return !seen.has(comment.id)
    },
    [comments],
  )

  useEffect(() => {
    supabase
      .channel(Channel)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `blog_id=eq.${slug}`,
        },
        (payload) => {
          const comment = payload.new as Comment
          if (shouldAddComment(comment)) {
            setComments((prev) => [...prev, comment])
          }
        },
      )
      .subscribe()
    return () => {
      supabase.channel(Channel).unsubscribe()
    }
  }, [shouldAddComment, setComments, slug])

  const onComment = async () => {
    const unique_id = uuid()
    const comment = {
      id: unique_id,
      blog_id: slug,
      name: '',
      email: '',
      vote: 0,
      text: currentCommentText,
    } as Comment
    if (shouldAddComment(comment)) {
      setComments((prev) => [...prev, comment])
    }
    await supabase.from('comments').insert(comment)
  }

  // for populating comments
  useEffect(() => {
    const getComments = async () => {
      return (await supabase.from('comments').select().eq('blog_id', slug))
        .data as Comment[]
    }
    getComments().then(setComments)
  }, [setComments, slug])

  return (
    <div>
      <div>
        {comments?.map((comment) => (
          <div key={comment.id}>{comment.text}</div>
        )) ?? 'we got nothing'}
      </div>
      <div>
        <textarea
          style={{ color: 'black' }}
          id="message"
          name="message"
          value={currentCommentText}
          onChange={(event) => {
            setCurrentCommentText(event.target.value)
          }}
        />
        <button onClick={onComment}>submit</button>
      </div>
    </div>
  )
}
