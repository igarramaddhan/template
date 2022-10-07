import {useQuery} from '@tanstack/react-query';
import {Suspense} from 'react';
import {Link} from 'react-router-dom';

const fetchPost = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

const PostList = () => {
  const {data} = useQuery(['key', 'posts'], fetchPost, {suspense: true});
  return (
    <ul>
      {data?.map((val) => (
        <li key={val.id}>{val.title}</li>
      ))}
    </ul>
  );
};

const HomePage = () => (
  <div>
    <h1>This is Home Page test 123123</h1>
    <div>
      <Link to="/detail">Detail Page</Link>
    </div>
    <Suspense fallback={'Loading post...'}>
      <PostList />
    </Suspense>
  </div>
);

export default HomePage;
