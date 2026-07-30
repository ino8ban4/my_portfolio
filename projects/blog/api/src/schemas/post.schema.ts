const baseIdParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string'}
  }
};

const basePostBodySchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
    published: { type: 'boolean' },
  }
};

const createPostBodySchema = {
  ...basePostBodySchema,
  required: ['title', 'content']
};

const updatePostBodySchema = {
  ...basePostBodySchema,
  required: ['title', 'content', 'published']
};

export const createPostSchema = {
  body: createPostBodySchema
};

export const getPostSchema = {
  params: baseIdParamSchema
};

export const updatePostSchema = {
  body: updatePostBodySchema,
  params: baseIdParamSchema
};

export const deletePostSchema = {
  params: baseIdParamSchema
};
