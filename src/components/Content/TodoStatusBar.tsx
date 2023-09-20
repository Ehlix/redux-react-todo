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

  return <div className="mt-auto flex">
    <button tabIndex={3}
            className={(status === "all" && 'bg-c-select-1 text-t-alt-1') + ' grow'}
            onClick={() => setStatus('all')}>All
    </button>
    <button tabIndex={3}
            className={(status === "current" && 'bg-c-select-1 text-t-alt-1') + ' grow'}
            onClick={() => setStatus('current')}>Current
    </button>
    <button tabIndex={3}
            className={(status === "complete" && 'bg-c-select-1 text-t-alt-1') + ' grow'}
            onClick={() => setStatus('complete')}>Complete
    </button>
  </div>;
};