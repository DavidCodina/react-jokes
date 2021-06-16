import { render, screen, waitForElementToBeRemoved, waitFor } from '../../../../test-utils'; // eslint-disable-line
import userEvent           from '@testing-library/user-event'; 
import { Route }           from 'react-router-dom';
import { Consumer }        from '../../../../Context';
import { RandomJokePage }  from '../RandomJokePage';
// import { rest }         from 'msw';
// import { server }       from '../../../../mocks/server';


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


  // Real tests go here...


  // This is to help the mock API calls pass.
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
});




// test('Alert is shown when API request fails.', async () => {
//
//   // ... Test server error.
//   
// });




