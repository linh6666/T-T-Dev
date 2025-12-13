import dynamic from 'next/dynamic';

const Camera = dynamic(
  () => import('../../../../../components/Introducingvideos3'),
  { ssr: false } // chỉ render trên client
);

export default function VideoPage() {
  return <Camera />;
}

