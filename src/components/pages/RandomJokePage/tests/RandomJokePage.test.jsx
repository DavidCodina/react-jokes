import { render, screen, waitForElementToBeRemoved, waitFor } from '../../../../test-utils'; // eslint-disable-line
import userEvent           from '@testing-library/user-event'; 
import { Route }           from 'react-router-dom';
import { Consumer }        from '../../../../Context';
import { RandomJokePage }  from '../RandomJokePage';
import { rest }            from 'msw';
import { server }          from '../../../../mocks/server';
import { Alert } from 'bootstrap';


/* =====================================================================

===================================================================== */


test('Elements render before and after like/dislike buttons are clicked.', async () => {
  render(
    <Consumer>
    {(value) => {
      return (
        <Route exact path="/" render={(props) => <RandomJokePage {...props} value={value}  /> } />
      );
    }}
    </Consumer>
  );


  // Test that heading is immediatly seen.
  const headerElement = screen.getByRole('heading', { name: /Random Joke/i }); 
  expect(headerElement).toBeInTheDocument(); // not really necessary.


  const selectElement = screen.getByRole('combobox', { name: /Select Joke Category/i });
  expect(selectElement).toBeInTheDocument();


  const likeButton = await screen.findByRole('button', { name: /^like button$/i })
  expect(likeButton).toBeInTheDocument();

  userEvent.click(likeButton);
  await screen.findByText(/Loading/i);


  const dislikeButton = await screen.findByRole('button', { name: /^dislike button$/i })
  expect(dislikeButton).toBeInTheDocument();


  userEvent.click(dislikeButton);
  await screen.findByText(/Loading/i);


  // This is to help the mock API calls pass.
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
});




test('Alert is shown when API request fails.', async () => {
  server.resetHandlers(
    rest.get('https://v2.jokeapi.dev/joke/any', (req, res, ctx) => res(ctx.status(500)))
  );

  render(
    <Consumer>
    {(value) => {
      return (
        <Route exact path="/" render={(props) => <RandomJokePage {...props} value={value}  /> } />
      );
    }}
    </Consumer>
  );


  await waitFor(async () => {
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});




