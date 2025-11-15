import dynamic from 'next/dynamic';

const Camera = dynamic(
  () => import('../../../../../components/Introducingvideos'),
  { ssr: false } // chỉ render trên client
);

export default function VideoPage() {
  return <Camera />;
}

