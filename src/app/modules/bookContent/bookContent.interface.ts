import { Model } from 'mongoose';

export type IEbookContent = {
  book: string;
};
export type EbookContentModel = Model<IEbookContent>;
