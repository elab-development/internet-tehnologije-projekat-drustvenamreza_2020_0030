import React, { useEffect, useState } from 'react';
import axios from 'axios';

// style
import { Typography, useTheme } from '@mui/material';

// components
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';

const HashtagsWidget = () => {
  const [tags, setTags] = useState(null);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const getHashTags = async () => {
      const options = {
        method: 'GET',
        url: 'https://hashtag5.p.rapidapi.com/api/v2.1/tag/top',
        headers: {
          'X-RapidAPI-Key':
            '595f1a464cmsh09d0e376f8e390fp159755jsn06684947e468',
          'X-RapidAPI-Host': 'hashtag5.p.rapidapi.com',
        },
      };

      const res = await axios.request(options);
      setTags(res.data.tags);
    };

    getHashTags();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper m='2rem 0'>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Most Popular Hashtags
        </Typography>
        <Typography color={medium}>RapidApi</Typography>
      </FlexBetween>
      <Typography fontWeight='500' m='0.5rem 0'>
        {tags &&
          tags.map((tag, index) => (
            <>
              <span key={index}>#{tag}</span>, {index % 5 === 4 && <br />}
            </>
          ))}
      </Typography>
    </WidgetWrapper>
  );
};

export default HashtagsWidget;
