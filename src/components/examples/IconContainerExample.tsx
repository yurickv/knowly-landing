import IconContainer from '@/components/ui/IconContainer';
import { CAMERA_ICON_PATH } from '@/components/icons/CameraIcon';

export default function IconContainerExample() {
  return (
    <div className="flex gap-8 p-8">
      {/* Example with default rotation */}
      <IconContainer iconSrc={CAMERA_ICON_PATH} iconAlt="Camera" />

      {/* Example with custom rotation */}
      <IconContainer iconSrc={CAMERA_ICON_PATH} iconAlt="Camera" rotation={30} />

      {/* Example with no rotation */}
      <IconContainer iconSrc={CAMERA_ICON_PATH} iconAlt="Camera" rotation={0} />

      {/* Example with different icon */}
      <IconContainer iconSrc="/icons/another-icon.png" iconAlt="Another Icon" rotation={45} />
    </div>
  );
}
