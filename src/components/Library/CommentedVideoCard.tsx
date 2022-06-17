import { STATIC_ASSETS } from '@utils/constants'
import { getIsSensitiveContent } from '@utils/functions/getIsSensitiveContent'
import getProfilePicture from '@utils/functions/getProfilePicture'
import getThumbnailUrl from '@utils/functions/getThumbnailUrl'
import imageCdn from '@utils/functions/imageCdn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import React, { FC } from 'react'
import { LenstubePublication } from 'src/types/local'
dayjs.extend(relativeTime)

type Props = {
  comment: LenstubePublication
}

const CommentedVideoCard: FC<Props> = ({ comment }) => {
  const commentedOn = comment.commentOn as LenstubePublication
  const isSensitiveContent = getIsSensitiveContent(
    commentedOn.metadata?.attributes
  )

  return (
    <Link href={`/watch/${commentedOn.pubId}`} passHref>
      <a className="overflow-hidden cursor-pointer group bg-gray-50 rounded-xl dark:bg-[#181818]">
        <div className="relative rounded-t-xl aspect-w-16 aspect-h-7">
          <img
            src={imageCdn(
              isSensitiveContent
                ? `${STATIC_ASSETS}/images/sensor-blur.png`
                : getThumbnailUrl(commentedOn)
            )}
            alt=""
            draggable={false}
            className="object-cover object-center w-full h-full rounded-t-xl lg:w-full lg:h-full"
          />
          {isSensitiveContent && (
            <div className="absolute top-2 left-3">
              <span className="py-0.5 text-[10px] px-2 text-black bg-white rounded-full">
                Sensitive Content
              </span>
            </div>
          )}
        </div>
        <div className="p-2">
          <div className="flex items-start space-x-2.5">
            <div className="flex-none mt-0.5">
              <img
                className="w-8 h-8 rounded-xl"
                src={getProfilePicture(comment.profile)}
                alt=""
                draggable={false}
              />
            </div>
            <div className="flex flex-col items-start flex-1">
              <div className="flex w-full items-start justify-between space-x-1.5">
                <h3 className="font-medium text-[15px] line-clamp-1 opacity-80">
                  {commentedOn.metadata?.name}
                </h3>
              </div>
              <Link href={`/${comment.profile?.handle}`}>
                <a className="text-xs hover:opacity-100 opacity-70">
                  {comment.profile?.handle}
                </a>
              </Link>
            </div>
          </div>
          <div className="relative pt-2 overflow-hidden text-sm opacity-90">
            <div className="absolute left-3 pb-1 inset-0 flex justify-center w-1.5">
              <div className="w-0.5 bg-gray-300 dark:bg-gray-700 pointer-events-none" />
            </div>
            <div className="pl-7">
              <span className="text-sm line-clamp-1">
                {comment.metadata.content}
              </span>
              <div className="flex items-center text-[10px] opacity-70">
                <span>{dayjs(new Date(commentedOn.createdAt)).fromNow()}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CommentedVideoCard