import { AriaAttributes, DOMAttributes } from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    rel?: string;
    fetchpriority?: string;
  }
<<<<<<< HEAD
};
=======
};


>>>>>>> 2aedd7c (improvements)
