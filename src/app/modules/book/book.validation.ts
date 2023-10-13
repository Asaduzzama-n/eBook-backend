import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    eBookContent: z.object({
      book: z.string({ required_error: 'Book content is required!' }),
    }),
    title: z.string({ required_error: 'Title is required!' }),
    ebookId: z.string().optional(),
    isbn: z.string({ required_error: 'ISBN is Required!' }),
    bookDescription: z.string({
      required_error: 'Book description is required!',
    }),
    author: z.object({
      author1: z.string({ required_error: 'Author required!' }),
      author2: z.string().optional(),
      author3: z.string().optional(),
    }),
    category: z.string({ required_error: 'Category is Required!' }),
    publicationYear: z.string({
      required_error: 'Publication year is Required!',
    }),
    edition: z.string({ required_error: 'Edition is Required!' }),
    price: z.number({ required_error: 'Price is Required!' }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    isbn: z.string().optional(),
    // ebookId: z.string().optional(),
    bookDescription: z.string().optional(),
    author: z
      .object({
        author1: z.string().optional(),
        author2: z.string().optional(),
        author3: z.string().optional(),
      })
      .optional(),
    category: z.string().optional(),
    publisher: z
      .object({
        name: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    edition: z.string().optional(),
    price: z.number().optional(),
  }),
});

const createBookContentZodSchema = z.object({
  body: z.object({
    book: z.string({ required_error: 'Book Content is required!' }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  createBookContentZodSchema,
};
