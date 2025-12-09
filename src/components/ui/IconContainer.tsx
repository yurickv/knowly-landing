import Image from 'next/image';

interface IconContainerProps {
  iconSrc: string;
  iconAlt?: string;
  rotation?: number;
  iconRotation?: number;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export default function IconContainer({
  iconSrc,
  iconAlt = 'Icon',
  iconWidth = 32,
  iconHeight = 32,
  rotation = 0,
  iconRotation,
  className = '',
}: IconContainerProps) {
  return (
    <div
      className={`inline-block ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="rounded-[18px] p-[2px] shadow-[0px_4px_8px_0px_#D5D1FF]">
        {/* White background container */}
        <div className="w-10 lg:w-16 h-10 lg:h-16 bg-white rounded-[16px] p-1.5 lg:p-3 flex items-center justify-center shadow-[0px_4px_8px_0px_#D5D1FF]">
          <div
            style={{
              width: iconWidth,
              height: iconHeight,
            }}
          >
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={iconWidth}
              height={iconHeight}
              className="w-full h-full object-contain"
              style={{
                transform: `rotate(${iconRotation !== undefined ? iconRotation : -rotation}deg)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
