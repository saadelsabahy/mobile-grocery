import {useEffect, useRef} from 'react';

function useEffectUpdate(callback: () => void) {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }
    callback(); // performing action after state has updated
  }, [callback]);
}

export default useEffectUpdate;
