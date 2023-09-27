import { useRouter } from 'next/router';

function AdDetailComponent() {
  const router = useRouter();
  return (
    <p>
      Display details of ad with id
      {router.query.id}
    </p>
  );
}

export default AdDetailComponent;
