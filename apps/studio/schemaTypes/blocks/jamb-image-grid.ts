import { Grid3x3 } from "lucide-react";
import { defineField, defineType } from "sanity";
import { createRadioListLayout } from "../../utils/helper";

const imageFillOptions = ["contain", "cover"];
const MAX_DESCRIPTION_LENGHT = 500;
const DEFAULT_DESCRIPTION_LENGTH = 55;
const MINIMUM_DESCRIPTION_LENGTH = 10;

const backgroundColorOptions = [
  { title: "Transparent", value: "transparent" },
  { title: "Muted", value: "#DFDAD7" },
  { title: "Custom Color", value: "custom" },
];

export const jambImageGrid = defineType({
  name: "jambImageGrid",
  type: "object",
  title: "Jamb Image Grid",
  description:
    "Image grid component with configurable layout - headline, title, subtitle, images, and CTAs",
  icon: Grid3x3,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "The main heading text for the image grid section that captures attention",
    }),
    defineField({
      name: "backgroundColor",
      type: "string",
      title: "Background Color",
      description:
        "Choose a predefined background color or select 'Custom Color' to use your own. This affects the overall background of the image grid section.",
      initialValue: "#DFDAD7",
      options: createRadioListLayout(backgroundColorOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customBackgroundColor",
      type: "string",
      title: "Custom Background Color",
      description:
        "Enter a custom background color value (e.g., #FF0000, rgba(255,0,0,0.5), or color name). This field only appears when 'Custom Color' is selected above.",
      hidden: ({ parent }) => parent?.backgroundColor !== "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          const backgroundType = (
            context.parent as { backgroundColor?: string }
          )?.backgroundColor;

          if (backgroundType === "custom" && !value) {
            return 'Custom background color is required when "Custom Color" is selected.';
          }

          return true;
        }),
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      description: "List of features to display in the image grid",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              description: "The image for this feature item",
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
            defineField({
              name: "imageFill",
              type: "string",
              title: "Image Fill Option",
              description:
                "How the image should fill its container - 'cover' fills the entire area (may crop), 'contain' shows the entire image (may leave empty space)",
              initialValue: "cover",
              options: createRadioListLayout(imageFillOptions, {
                direction: "horizontal",
              }),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              description: "The title text for this feature",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              description: "The description text for this feature",
              rows: 3,
            }),
            defineField({
              name: "truncateTitle",
              type: "boolean",
              title: "Truncate Title",
              description: "Whether to truncate the title if it's too long",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              image: "image",
            },
            prepare: ({ title, image }) => ({
              title: title || "Untitled Feature",
              media: image,
            }),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "maxDescriptionLength",
      type: "number",
      title: "Max Description Length",
      description:
        "Maximum number of characters to show in descriptions before showing 'Read more' button",
      initialValue: DEFAULT_DESCRIPTION_LENGTH,
      validation: (rule) =>
        rule.min(MINIMUM_DESCRIPTION_LENGTH).max(MAX_DESCRIPTION_LENGHT).required(),
    }),
    defineField({
      name: "allowNavigation",
      type: "boolean",
      title: "Allow Navigation",
      description:
        "Enable this to allow this section to be linked from the hero navigation. Title is required when enabled.",
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { title?: string };
          if (value === true && !parent?.title?.trim()) {
            return "Title is required when navigation is enabled.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Image Grid",
      media: Grid3x3,
    }),
  },
});
