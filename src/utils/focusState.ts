import {useEffect, useState} from 'react';

const useFocusTitle = (init: string, lostFocusTitle: string, factor?: any) => {
  const [title, setTitle] = useState<string>(init);

  useEffect(() => {
    setTitle(`${init} - Westay.org`);
    document.title = title;
  }, [factor, title]);

  useEffect(() => {
    window.onblur  = () => {
      document.title = lostFocusTitle;
    };
    window.onfocus = () => {
      document.title = title;
    };

    return () => {
      window.onblur  = () => false;
      window.onfocus = () => false;
      document.title = title;
    };
  }, [factor, title]);

};

export default useFocusTitle;
