import { Source } from './source';

/**
 * A creator interface used to instantiate source implementation
 */
export interface SourceCreator {
  new(sourceValue: string): Source;
}
