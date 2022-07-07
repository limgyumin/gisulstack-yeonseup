import { useRouter } from 'next/router';

import PictureDetail from '../PictureDetail';

import Modal from 'components/common/Modal';

// to prevent unnecessary re-render
const PictureDetailModal: React.FC = () => {
  const router = useRouter();

  const hasSelectedPicture = router.query.id != null;

  return (
    <Modal open={hasSelectedPicture} onOverlayClick={router.back}>
      <PictureDetail pictureId={router.query.id as string} />
    </Modal>
  );
};

export default PictureDetailModal;
