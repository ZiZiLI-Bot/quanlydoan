import React from 'react';
import ActivityPost from './ActivityPost';
import Header from './Header';
import PostPreview from './PostPreview';

export default function Home() {
  return (
    <>
      <Header />
      <PostPreview />
      <ActivityPost />
    </>
  );
}
