import { loader } from 'fumadocs-core/source';
import { writing } from '@/.source/server';

export const writingSource = loader({
  baseUrl: '/writing',
  source: writing.toFumadocsSource(),
});
