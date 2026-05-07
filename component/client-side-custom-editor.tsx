'use client';

import dynamic from 'next/dynamic';

type ClientSideCustomEditorProps = {
  onChange: (content: string) => void;
};

const ClientSideCustomEditor = dynamic<ClientSideCustomEditorProps>(
  () => import('@/component/custom-editor'),
  { ssr: false }
);

export default ClientSideCustomEditor;