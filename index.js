const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());




app.get('/news', (req, res) => {
  res.json({ success: true, data: newsArticles });
});


app.get('/news/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const article = newsArticles.find(a => a.id === id);
  if (article) {
    res.json({ success: true, data: article });
  } else {
    res.status(404).json({ success: false, message: "Article not found." });
  }
});


app.post('/news', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "Title and content are required." });
  }
  const newArticle = {
    id: newsArticles.length + 1,
    title,
    content
  };
  newsArticles.push(newArticle);
  res.status(201).json({ success: true, data: newArticle });
});


app.put('/news/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  const articleIndex = newsArticles.findIndex(a => a.id === id);

  if (articleIndex === -1) {
    return res.status(404).json({ success: false, message: "Article not found." });
  }

  if (!title && !content) {
    return res.status(400).json({ success: false, message: "Title or content must be provided." });
  }

  newsArticles[articleIndex] = {
    ...newsArticles[articleIndex],
    title: title || newsArticles[articleIndex].title,
    content: content || newsArticles[articleIndex].content
  };

  res.json({ success: true, data: newsArticles[articleIndex] });
});


app.delete('/news/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const articleIndex = newsArticles.findIndex(a => a.id === id);

  if (articleIndex === -1) {
    return res.status(404).json({ success: false, message: "Article not found." });
  }

  const deletedArticle = newsArticles.splice(articleIndex, 1);
  res.json({ success: true, data: deletedArticle });
});


app.listen(port, () => {
  console.log(`News app listening at http://localhost:${port}`);
});
