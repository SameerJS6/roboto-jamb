import { Sparkles } from "lucide-react";
import { defineField, defineType } from "sanity";

export const jambHero = defineType({
  name: "jambHero",
  title: "Jamb Hero",
  icon: Sparkles,
  type: "object",
  description:
    "Hero component with image and auto-generated navigation links to sections with allowNavigation enabled",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "The main hero image - should be high quality and visually impactful",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Alternative text for the image - important for accessibility and SEO",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      image: "image",
    },
    prepare: ({ image }) => ({
      title: "Jamb Hero",
      subtitle: "Hero with auto-generated navigation",
      media: image,
    }),
  },
});

