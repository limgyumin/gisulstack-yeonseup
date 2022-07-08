import { useRouter } from 'next/router';

import PictureDetail from '../PictureDetail';

import Modal from 'components/common/Modal';

import { PICTURE_MODAL_HEIGHT, PICTURE_MODAL_WIDTH } from 'constants/pictures';

// to prevent unnecessary re-render
const PictureDetailModal: React.FC = () => {
  const router = useRouter();

  const hasSelectedPicture = router.query.id != null;

  return (
    <Modal
      width={PICTURE_MODAL_WIDTH}
      height={PICTURE_MODAL_HEIGHT}
      open={hasSelectedPicture}
      onOverlayClick={router.back}
    >
      <PictureDetail pictureId={router.query.id as string} />
    </Modal>
  );
};

export default PictureDetailModal;
