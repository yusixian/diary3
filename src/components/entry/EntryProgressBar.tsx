import { Progress } from 'antd';
import { useMemo } from 'react';

function EntryProgressBar(props: { points: number }) {
  const points = props.points + 10;
  const percent = Math.ceil((points * 10000) / 24) / 100;
  const gradient = {
    '0%': '#3385E4',
    '25%': '#6CD261',
    '50%': '#F2DB2D',
    '75%': '#EA7E30',
    '100%': '#924FDA',
  };
  const indicate = useMemo(() => {
    const value = (percent * 24) / 100;
    return Math.min(value, 24);
  }, [percent]);

  return (
    <div className="relative mt-4 flex w-full gap-2">
      <div className="absolute left-0 top-[0.4rem] z-[1] flex flex-col items-center">
        <i className="block rounded-full border-2 border-white bg-transparent p-1" />0
      </div>
      <div className="absolute left-1/3 top-[0.4rem] z-[1] flex flex-col items-center">
        <i className="block rounded-full border-2 border-white bg-transparent p-1" />8
      </div>
      <div className="absolute left-2/3 top-[0.4rem] z-[1] flex flex-col items-center">
        <i className="block rounded-full border-2 border-white bg-transparent p-1" />
        16
      </div>
      <div className="absolute right-0.5 top-[0.4rem] z-[1] flex flex-col items-center">
        <i className="block rounded-full border-2 border-white bg-transparent p-1" />
        24
      </div>
      <Progress className="flex-grow" status="active" strokeColor={gradient} showInfo={false} percent={percent} />

      <div
        className="clip-path-message absolute top-0 w-fit -translate-x-1/2 -translate-y-[85%] bg-black px-1 pb-1.5 pt-0.5 text-[#FAFAFA]"
        style={{ left: `calc(${percent}% - 0.4rem)` }}
      >
        {indicate.toFixed(1)}
      </div>
    </div>
  );
}

export default EntryProgressBar;
