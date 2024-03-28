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

    render(<NewsItem newsItem={testNewsItem} />)
    expect(screen.getByTestId('title')).toHaveTextContent(testNewsItem.title);
  })
})


