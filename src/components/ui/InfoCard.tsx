import React from 'react';
import { Card } from './card';

interface InfoCardProps {
  title: string;
  big?: boolean;
  className?: string;
}

export default function InfoCard({
  title,
  big,
  className = '',
}: InfoCardProps) {
  return (
    <Card
      className={`overflow-hidden bg-white shadow-[0px_4px_8px_0px_#E5E5FF] hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <h3 className="text-gray-800 font-medium leading-relaxed">{title}</h3>
        <div className="min-h-2 bg-[#F0F0F0] rounded-lg min-w-20 mt-2"></div>
        <div className="min-h-2 bg-[#F0F0F0] rounded-lg w-20 lg:w-30 mt-2"></div>
        {big && (
          <>
            <div className="min-h-2 bg-[#F0F0F0] rounded-lg min-w-30 mt-4"></div>
            <div className="min-h-2 bg-[#F0F0F0] rounded-lg w-20 mt-2"></div>
            <div className="min-h-2 bg-[#F0F0F0] rounded-lg min-w-30 mt-4 hidden md:block"></div>
            <div className="min-h-2 bg-[#F0F0F0] rounded-lg w-20 mt-2 hidden md:block"></div>
          </>
        )}
      </div>
    </Card>
  );
}
