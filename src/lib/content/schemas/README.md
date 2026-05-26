# Sanity Schema Types

Add one `.ts` file per Sanity document type here.

## Example

```ts
// src/lib/content/schemas/post.ts
import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "body",  type: "text"   }),
  ],
});
```

Then register in `sanity.config.ts`:
```ts
import { post } from "./src/lib/content/schemas/post";
schema: { types: [post] }
```
