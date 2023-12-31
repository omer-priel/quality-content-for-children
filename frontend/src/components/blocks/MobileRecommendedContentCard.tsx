'use client';

import { useTranslations } from 'next-intl';

import YouTubeVideo from '@/components/atoms/YouTubeVideo';

import { Content } from '@/lib/api/schemas';
import { multiFontText } from '@/lib/styling';

interface Props {
  content: Content;
}

export default function MobileRecommendedContentCard({ content }: Props) {
  const t = useTranslations();

  const links: string[][] = [];

  if (content.youtube) {
    links.push([t('link-to-youtube-video'), content.link]);

    if (content.youtube.playlist) {
      links.push([t('link-to-youtube-playlist'), `https://www.youtube.com/playlist?list=${content.youtube.playlist.id}`]);
    }
  } else {
    links.push([t('link-to-website'), content.link]);
  }

  let contentType = 0;
  if (content.youtube) {
    contentType = 1;
  }

  return (
    <div className='w-full h-fit z-10'>
      <div className='w-full h-fit px-[5vw]'>
        {contentType == 1 && <YouTubeVideo playerId={-1} content={content} width='90vw' height='43.84vw' playButtonSize={50} />}
      </div>
      <div className='w-[calc(90vw_-_66px)] h-[18px] mx-[33px] mt-[8.38px] text-white text-[12px]/[18px] font-black'>
        {multiFontText(content.title)}
      </div>
    </div>
  );
}
