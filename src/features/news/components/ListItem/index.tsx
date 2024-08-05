import  './newsItem.scss';

interface ScrollItemProps {
  title: string,
}
export default function ScrollItem({
  title
}: ScrollItemProps) {
  
  return (
      <div
        className={'text-center bg-white rounded-xl flex mx-0 my-5 px-20 py-8 max-w-[96rem] max-[868px]:p-10 max-[868px]:flex-col w-full'} 
        data-testid="ListItem"
      >
        <div className={'w-full'}>
          <h1 className='text-lightblue text-2xl uppercase' data-testid="title">
            {title}
          </h1>
        </div>
      </div>
  );
}
