const express = require("express");
const Router = express.Router();
const DB = require("./DB");
const { v4: uuid } = require("uuid");

// Get Quiz Data
Router.post("/join", async (req, res) => {
  const { quizid, user } = req.body;
  console.log(quizid);
  if (!quizid || !user) {
    res.send({ error: "Incomplete Parameters" });
  }

  try {
    var attempted = await DB.attempted.findFirst({
      where: {
        quizid: quizid,
        user: user,
      },
    });

    if (attempted) {
      attempted = true;
    } else {
      attempted = false;
    }
    const result = await DB.quizzes.findFirst({
      where: {
        quizid: quizid,
      },
    });
    console.log(result);
    if (!result) {
      res.send({ error: "Quiz not found" });
      return;
    }
    const questions = await DB.question.findMany({
      where: {
        quizzesQuizid: quizid,
      },
      orderBy: {
        id: "asc",
      },
    });

    const options = [];

    for (let i = 0; i < questions.length; i++) {
      const opt = await DB.option.findMany({
        where: {
          questionId: questions[i].id,
        },
        orderBy: {
          id: "asc",
        },
      });
      options.push(opt);
    }

    const questionsData = [];
    for (let i = 0; i < questions.length; i++) {
      questionsData.push({
        statement: questions[i].statement,
        options: options[i],
      });
    }

    res.send({
      title: result.title,
      data: questionsData,
      attempted: attempted,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Submit the quiz
Router.post("/submit", async (req, res) => {
  const { quizid, responses } = req.body;
  console.log(quizid);
  if (!quizid) {
    res.send({ error: "Incomplete Parameters" });
  }

  try {
    const result = await DB.quizzes.findFirst({
      where: {
        quizid: quizid,
      },
    });

    if (!result) {
      res.send({ error: "Quiz not found" });
      return;
    }

    const questions = await DB.question.findMany({
      where: {
        quizzesQuizid: quizid,
      },
      orderBy: {
        id: "asc",
      },
    });

    const options = [];

    for (let i = 0; i < questions.length; i++) {
      const opt = await DB.option.findMany({
        where: {
          questionId: questions[i].id,
        },
        orderBy: {
          id: "asc",
        },
      });
      options.push(opt);
    }

    var score = 0;

    for (let i = 0; i < questions.length; i++) {
      const ansIndex = questions[i].answer;
      const userAns = responses[i];
      if (ansIndex == userAns) {
        score += 1;
      }
    }

    res.send({ ok: true, score: score });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Create Quiz
Router.post("/create", async (req, res) => {
  const quizid = uuid();
  const { title, author, questions } = req.body;
  if (!quizid || !author || !questions) {
    res.send({ error: "Incomplete Parameters" });
  }

  const questionsData = [];

  questions.forEach((question) => {
    const optionsData = [];

    question.options.forEach((option) => {
      optionsData.push({
        text: option.text,
      });
    });

    questionsData.push({
      statement: question.statement,
      answer: question.answer,
      options: {
        create: [...optionsData],
      },
    });
  });

  const result = await DB.quizzes.create({
    data: {
      title: title,
      quizid: quizid,
      author: author,
      questions: {
        create: [...questionsData],
      },
    },
  });

  res.send({ ok: true, data: result });
});

Router.post("/attempt", async (req, res) => {
  const data = req.body;
  try {
    const res = await DB.attempted.create({
      data: data,
    });
    res.send({ ok: true, data: res });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, data: error });
  }
});

Router.post("/attempted", async (req, res) => {
  const { user } = req.body;

  try {
    const result = await DB.attempted.findMany({
      where: {
        user: user,
      },
    });
    res.send({ ok: true, data: result });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, data: error });
  }
});

Router.post("/user", async (req, res) => {
  const { author } = req.body;
  if (!author) {
    res.send({ ok: false, error: "Incomplete Parameters" });
  }
  try {
    const result = await DB.quizzes.findMany({
      where: { author: author },
    });

    res.send({ ok: true, data: result });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

Router.post("/edit", (req, res) => {});

Router.post("/responses", (req, res) => {});

module.exports = Router;
