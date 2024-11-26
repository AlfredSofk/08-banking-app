import { useEffect, useRef } from 'react';

export const useWhyDidYouUpdate = (name, props) => {
  const previousProps = useRef(props);

  useEffect(() => {
    const changedProps = Object.keys(props).reduce((acc, key) => {
      if (props[key] !== previousProps.current[key]) {
        acc[key] = { from: previousProps.current[key], to: props[key] };
      }
      return acc;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      console.log(`[why-did-you-update] ${name}`, changedProps);
    }

    previousProps.current = props;
  });
};
