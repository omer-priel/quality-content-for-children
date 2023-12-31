'use client';

import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';
import { multiFontText } from '@/lib/styling';

interface Props {
  content: Content;
}

export default function ContentCard({ content }: Props) {
  let contentType = 0;
  if (content.youtube) {
    contentType = 1;
  }

  return (
    <div>
      <div className='w-[395px] h-[220px]'>
        {contentType == 1 && (
          <YouTubeVideo playerId={content.index} content={content} width='395px' height='220px' innerClassName='rounded-[10px]' />
        )}
      </div>
      <div className='mt-[14px] text-white text-[16px]/[24px] text-right font-black'>{multiFontText(content.title)}</div>
    </div>
  );
}
