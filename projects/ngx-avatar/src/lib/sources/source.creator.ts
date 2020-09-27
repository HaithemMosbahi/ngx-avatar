import { Source } from './source';

/**
 * A creator interface used to instantiate source implementation
 */
export type SourceCreator = new (sourceValue: string) => Source;
