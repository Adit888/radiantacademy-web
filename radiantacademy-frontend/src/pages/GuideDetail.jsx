import { useParams } from 'react-router-dom';

function GuideDetail() {
  const { id } = useParams();

  return <div className="p-4">Detail Guide ID: {id}</div>;
}

export default GuideDetail;
