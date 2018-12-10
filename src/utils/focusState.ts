import {useEffect} from 'react';

const focus = (init: string, lostFocusTitle: string) => {

  useEffect(() => {
      document.title = init;
  }, []);

  useEffect(() => {
    window.onblur  = () => {
      document.title = lostFocusTitle;
    };
    window.onfocus = () => {
      document.title = init;
    };

    return () => {
      window.onblur = () => false;
      window.onfocus = () => false;
    };
  }, []);

};

export default focus;
