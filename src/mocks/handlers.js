import { rest } from 'msw';


export const handlers = [
  rest.get('https://v2.jokeapi.dev/joke/any', (req, res, ctx) => {
    return res(
      ctx.json({ 
        category: 'Pun', 
        error: false,
        id: 74,
        joke: "Bla bla bla...",
        type: "single"
      })
    );
  })
];
