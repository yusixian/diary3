'use client';

import React, { JSX } from 'react';

export const ProviderComposer: Component<{
  contexts: JSX.Element[];
}> = ({ contexts, children }) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return React.cloneElement(parent, { children: kids });
  }, children);
};
