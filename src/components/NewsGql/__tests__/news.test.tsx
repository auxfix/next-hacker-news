import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import NewsItem from '@/features/news/components/NewsItem';

const hackerStory =  {
  authorId: '12',
  id: 1,
  img: 'http://testimage.com/image.svg',
  karma: 3,
  num: 3,
  score: 10,
  time: 1708618644080,
  title: 'exiting news',
  url: 'https://www.google.com/search?q=hacker+news'
}

describe('<News />', () => { 
  test('News Item Renders Properly', async () => {
    const testNewsItem = hackerStory;
    const { container, getByAltText, getByTestId  } = render(<NewsItem newsItem={testNewsItem} />)

    expect(getByAltText('News cover').getAttribute('src')).toBe(testNewsItem.img);
    expect(container.querySelector('img.news-item-image')?.getAttribute('src')).toBe(testNewsItem.img);

    expect(getByTestId('title')).toHaveTextContent(testNewsItem.title);
  })
})


