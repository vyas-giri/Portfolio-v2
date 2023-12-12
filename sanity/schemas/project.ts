export default {
    name: 'project',
    title: 'portfolio',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
        },
        {
            name: "overview",
            type: "string",
            title: "Small Overview",
        },
        {
            name: "image",
            type: "image",
            title: "Image",
        },
        {
            name: "link",
            type: "string",
            title: "Link",
        },
        {
            name: "github_link",
            type: "string",
            title: "Github Link",
        },
    ],
}