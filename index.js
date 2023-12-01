const express = require('express');
const app = express();
const fs = require('fs').promises;
const { v4: uuid } = require('uuid');
const port = process.env.PORT || 8000;

app.use(express.json());

const JSONFilePath = './blogPosts.json';

//read the blog posts from the JSON file
async function readBlogPosts() {
    try {
        const data = await fs.readFile(JSONFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

//write the blog posts to the JSON file
async function writeBlogPosts(blogPosts) {
    await fs.writeFile(JSONFilePath, JSON.stringify(blogPosts, null, 2));
}

// POST - Create a new blog post
app.post('/api/blog', async (req, res) => {
    try {
        const { content, author } = req.body;
        const createdAt = new Date().toISOString();
        const newBlogPost = { id: uuid(), content, author, createdAt };

        const blogPosts = await readBlogPosts();
        blogPosts.push(newBlogPost);
        await writeBlogPosts(blogPosts);

        res.status(201).json(newBlogPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

// GET - Get all blog posts
app.get('/api/blog', async (req, res) => {
    try {
        const blogPosts = await readBlogPosts();
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blog posts' });
    }
});

// GET - Get a specific blog post
app.get('/api/blog/:blogId', async (req, res) => {
    try {
        const blogPosts = await readBlogPosts();
        const blogPost = blogPosts.find((post) => post.id === req.params.blogId);

        if (!blogPost) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json(blogPost);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blog post' });
    }
});

// DELETE - Delete a specific blog post
app.delete('/api/blog/:blogId', async (req, res) => {
    try {
        const blogPosts = await readBlogPosts();
        const index = blogPosts.findIndex((post) => post.id === req.params.blogId);

        if (index === -1) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            blogPosts.splice(index, 1);
            await writeBlogPosts(blogPosts);
            res.sendStatus(204);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

// PATCH - Partially update a specific blog post
app.patch('/api/blog/:blogId', async (req, res) => {
    try {
        const { content, author } = req.body;
        const blogPosts = await readBlogPosts();
        const index = blogPosts.findIndex((post) => post.id === req.params.blogId);

        if (index === -1) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            if (content) {
                blogPosts[index].content = content;
            }
            if (author) {
                blogPosts[index].author = author;
            }

            await writeBlogPosts(blogPosts);
            res.json(blogPosts[index]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// testing the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

