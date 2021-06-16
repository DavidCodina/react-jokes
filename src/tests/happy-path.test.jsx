import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'; // eslint-disable-line
import userEvent           from '@testing-library/user-event'; 
import { Provider }        from '../Context';
import App                 from '../App';


/* =====================================================================

===================================================================== */


test('The happy path...', async () => {
  render(<App />, { wrapper: Provider });

  /* =====================
     Random Joke Page
  ===================== */


  const likeButton = await screen.findByRole('button', { name: /^like button$/i })
  expect(likeButton).toBeInTheDocument();


  // Like a joke
  userEvent.click(likeButton);
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));


  const likedJokesPageLink = screen.getByRole('link', { name: /Liked Jokes/i });
  expect(likedJokesPageLink).toBeInTheDocument();


  userEvent.click(likedJokesPageLink);


  /* =====================
      Liked Jokes Page
  ===================== */


  const headerElement = screen.getByRole('heading', { name: /Liked Jokes/i });
  expect(headerElement).toBeInTheDocument();


  const removeButton = screen.getByRole('button', { name: /Remove Joke/i });
  expect(removeButton).toBeInTheDocument();
  userEvent.click(removeButton);


  const noJokesMessage = await screen.findByText(/You haven't liked any jokes yet/i);
  expect(noJokesMessage).toBeInTheDocument();
});







