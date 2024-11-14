import React from "react";
import { IconType } from "react-icons";

type StatisticCount = {
  raw: string;
  formatted: string;
};

type StatisticItemProps = {
  name: string;
  count: StatisticCount;
  rise: boolean;
  message: string;
  icon: IconType;
  colorClass: string;
};

const StatisticItem: React.FC<StatisticItemProps> = ({
  name,
  count,
  rise,
  message,
  icon: Icon,
  colorClass,
}) => {
  return (
    <div className="relative -z-10 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div
        className={`shadow-white-500/40 absolute mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr bg-clip-border text-white shadow-lg ${colorClass}`}
      >
        <Icon size={30} />
      </div>
      <div className="p-4 text-right">
        <p className="text-blue-gray-600 block text-sm font-normal leading-normal antialiased">
          {name}
        </p>
        <h4 className="text-blue-gray-900 block text-2xl font-semibold leading-snug tracking-normal antialiased">
          {count.raw}
        </h4>
      </div>
      <div className="flex gap-2 pb-4 pt-2">
        <img
          src={`/assets/${rise ? "line-rise.svg" : "line-fall.svg"}`}
          alt="line-type"
          className="ml-4 h-6"
        />
        <p className="text-blue-gray-600 block text-[14px] font-normal leading-relaxed antialiased">
          <strong className="text-green-600">{count.formatted}</strong>
          &nbsp;{message}
        </p>
      </div>
    </div>
  );
};

export default StatisticItem;
