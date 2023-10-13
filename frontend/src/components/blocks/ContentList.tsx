'use client';

import { Fragment, useState } from 'react';

import { useTranslations } from 'next-intl';

import ContentCard from '@/components/blocks/ContentCard';

import { Content, ContentsSchema, getTranslatedTextByKey } from '@/lib/db/schemas';

interface Props {
  data: ContentsSchema;
  locale: string;
}

export default function ContentList({ data, locale }: Props) {
  const { contents, languages, domains, ageLevels, durations } = data;

  const t = useTranslations();

  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedAgeLevel, setSelectedAgeLevel] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(locale);
  const [searchText, setSearchText] = useState<string>('');

  const handleDomainChange = (domain: string) => {
    setSelectedDomain(domain === 'ALL' ? null : domain);
  };

  const handleAgeLevelChange = (ageLevel: string) => {
    setSelectedAgeLevel(ageLevel === 'ALL' ? null : ageLevel);
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration === 'ALL' ? null : duration);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language === 'ALL' ? null : language);
  };

  const searchValue = searchText.trim().length > 2 ? searchText.trim() : '';

  const showContentCard = (content: Content) => {
    return (
      (!selectedDomain || content.domain.key === selectedDomain) &&
      (!selectedAgeLevel || content.ageLevel.key === selectedAgeLevel) &&
      (!selectedDuration || content.duration.key === selectedDuration) &&
      (!selectedLanguage || content.language.id === selectedLanguage) &&
      (!searchValue || getTranslatedTextByKey(content.domain, locale).includes(searchValue) || content.name.includes(searchValue))
    );
  };

  return (
    <>
      <div className='my-4'>
        <div className='flex flex-wrap items-center justify-center'>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('domain')}:</label>
            <select onChange={(e) => handleDomainChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='ALL'>{t('all')}</option>
              {Object.keys(domains)
                .sort((domainKeyA, domainKeyB) => domains[domainKeyB].orderIndex - domains[domainKeyA].orderIndex)
                .map((domainKey) => (
                  <option key={domainKey} value={domainKey}>
                    {getTranslatedTextByKey(domains[domainKey], locale)}
                  </option>
                ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('age-level')}:</label>
            <select onChange={(e) => handleAgeLevelChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='ALL'>{t('all')}</option>
              {Object.keys(ageLevels)
                .sort((ageLevelKeyA, ageLevelKeyB) => ageLevels[ageLevelKeyB].orderIndex - ageLevels[ageLevelKeyA].orderIndex)
                .map((ageLevelKey) => (
                  <option key={ageLevelKey} value={ageLevelKey}>
                    {getTranslatedTextByKey(ageLevels[ageLevelKey], locale)}
                  </option>
                ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('duration')}:</label>
            <select onChange={(e) => handleDurationChange(e.target.value)} className='px-2 py-1 border rounded-md'>
              <option value='ALL'>{t('all')}</option>
              {Object.keys(durations)
                .sort((durationKeyA, durationKeyB) => durations[durationKeyB].orderIndex - durations[durationKeyA].orderIndex)
                .map((durationKey) => (
                  <option key={durationKey} value={durationKey}>
                    {getTranslatedTextByKey(durations[durationKey], locale)}
                  </option>
                ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('language')}:</label>
            <select className='px-2 py-1 border rounded-md' onChange={(e) => handleLanguageChange(e.target.value)} defaultValue={locale}>
              <option value='ALL'>{t('all')}</option>
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.label}
                </option>
              ))}
            </select>
          </div>
          <div className='mx-3 my-1'>
            <label className='mx-2'>{t('search')}:</label>
            <input type='text' onChange={(e) => setSearchText(e.target.value)} className='px-2 py-1 border rounded-md' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {contents.map((content) => (
          <Fragment key={content.index}>
            <ContentCard content={content} locale={locale} hidden={!showContentCard(content)} />
          </Fragment>
        ))}
      </div>
    </>
  );
}
