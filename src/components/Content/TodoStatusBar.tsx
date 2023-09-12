import React, {useEffect, useState} from "react";

interface propsStatusBar {
  getFilter: (status: 'all' | 'current' | 'complete') => void;
  curStatus: 'all' | 'current' | 'complete';
}

export const TodoStatusBar: React.FC<propsStatusBar> = ({getFilter, curStatus}) => {
  const [status, setStatus] = useState<'all' | 'current' | 'complete'>('all');
  useEffect(() => {
    if (curStatus) {
      setStatus(curStatus);
    }
  }, [curStatus]);
  useEffect(() => {
    getFilter(status);
  }, [status]);

  return <div className="flex gap-1">
    <button className={(status === "all" && 'bg-fuchsia-500') + ' grow'}
            onClick={() => setStatus('all')}>All
    </button>
    <button className={(status === "current" && 'bg-fuchsia-500') + ' grow'}
            onClick={() => setStatus('current')}>Current
    </button>
    <button className={(status === "complete" && 'bg-fuchsia-500') + ' grow'}
            onClick={() => setStatus('complete')}>Complete
    </button>
  </div>;
};