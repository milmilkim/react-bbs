const GalleryBoard = async () => {
  const res = await fetch('https://picsum.photos/v2/list');
  const data = await res.json();

  return <div>{JSON.stringify(data)}</div>;
};

export default GalleryBoard;
