# Suggestment

Deployed link
[Deployed link](https://suggestment.netlify.app/)

Link to Back-End
[Link to Backend](https://github.com/Nugget-Meister/Suggestment-BE)

## How to use

### Environment Variables

The following environment variables are required.

VITE_API_LOCAL="{Your link here}"
VITE_API_LIVE='{Your link here}'
VITE_API_ISLOCAL={true/false}

- VITE_API_LOCAL - Your locally deployed link
- VITE_API_LIVE - Your live deployed link
- VITE_API_ISLOCAL - {true/false} determines whether you are using your local or deployed link

### Signing In

If you are not signed in, you will be redirected to the sign-in page where you can either login with your credentials or create an account.

Once you have submitted a valid username and password combination, a modal will show on screen with the success/failure of your credentials.

- If successful, you will be sent an email to validate your sign in. Follow that link to sign in, which will redirect you to the home page.

### No account / Signing Up

If you don't have an account, clicking on the Sign Up button directs you to the Sign Up Form, where you will be prompted with an entry for your:

- Name
- Valid unused email address
- Strong password.

#### Password Requirements

Creating a password has the following requirements.

- A minimum of 12 letters.
- Contains a uppercase letter.
- Contains a lowercase letter.
- Contains a number.
- Contains a symbol.

### The Dashboard

The dashboard shows you a brief summary of information. 

- Your total income from your transactions, Your net balance from all transactions.
- The list of all transactions bound to your account. You are also given the option to create a new transaction.

- Clicking on a transaction will take you to the information page for that transaction. Where you can edit/delete the transaction.

#### New / Edit Transaction

Clicking on New Transaction or clicking edit on an existing transaction. To edit/create a new transaction, you will need the require fields.

- Date - The day the transaction was made.
- Description - Brief description of the transaction source (eg Diner Name, Company Name)
- Category - The category of the transaction
- Amount - The decimal value of the transaction.

Once you Submit your info, a modal will pop-up to confirm your choice. Then an additonal modal will display whether your submission was successful, before redirecting you to the dashboard.

### Changing your password.

To Change your password, navigate to the Profile page through the dashboard. It will then send you an email with a temporary link to reset your password. 

- The same requirements from Sign-up apply here.

Upon successfully changing your password, you will be forcefully signed out.

### Signing out

To sign out, simply close the tab.
