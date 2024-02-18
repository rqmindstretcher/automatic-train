const express = require('express');\nconst router = express.Router();\nconst { Question } = require('../models/Question');\n\nrouter.get('/category/:category/difficulty/:difficulty', async (req, res) => {\n  try {\n    const questions = await Question.find({\n      category: req.params.category,\n      difficulty: req.params.difficulty\n    });\n    res.json(questions);\n  } catch (error) {\n    res.status(500).json(error);\n  }\n});\n\nmodule.exports = router;