# Test KTR Epitech

Hello, and welcome to your first exercise in this brand new adventure you’ve embarked on! The purpose
of this test is to prove that your experience corresponds to the level expected at the beginning of MSc in
order to avoid unpleasant surprises once the training has started.

## Intro 

This project is a business card manager. It is aimed at young entrepreneurs who are looking for a digital
solution to store the information from their multiple business cards acquired during their various networking
evenings.

## Step 1 

1. Create your github account if you don’t have one yet
2. Create a private repository named ktr-msc-ls1
3. Give the rights to this deposit to the login you were given when you made contact

**Implementation by Lionel:**
-> The github was publicly created as mentionned by the instructor via email.

## Step 2

Create a “profile” interface allowing the user of your application to save his own information, in the following
form:
• Name (mandatory short text field)
• Company name (optional short text field)
• Email address (optional long text field)
• Telephone number (optional phone field)

Bonus : Make sure that this data is persistent.

**Implementation by Lionel:**
-> In /signup front-end point we can create a new profile with the those fields : name, password, email, company, telephone.
The data is **persistent** via the back-end which store data into a mongodb database in the Cloud (Atlas Mongo).
In order to access this database, a .env file is created at the root of back-end directory with URL_DATABASE env variable
(.env is of course not pushed on the repo)

To go further and beyond :
We could implement dynamic check validation for the fields in further development.

## Step 3
Create a password protection system for this interface.
+ BONUS 2 - MULTI-USERS 
Create one profile per user.
+ BONUS 3 - USER SWITCH 
Allow your users to log out.

**Implementation by Lionel:**
-> We can create as multiple profile as we want and we use the 'name' field as unique field to 
identify a user: the users are stored into a 'users' collection in mongodb.
We can login / logout via an authentication process which encrypt our password into the database (with bcrypt and salt is used in order to 
prevent rainbow table attacks) from where the back-end send back to the client a JWT (JSON Web Token).
The JWT allows the user to maintain session, which can be destroyed by logout in the header top corner right.

To go further :
Implement some protected endpoint in the back-end which authenticate the access_token, which i didn't implemented yet.


## Step 4

Create a “library” interface that allows your user to add new business cards to your application with the
following fields:
• Name (optional short text field)
• Company name (optional short text field)
• Email address (mandatory email field)
• Telephone number (optional phone field)

Allow two users of your application on two different devices to automatically exchange their profile infor-
mation and add it to their business card “library”.

**Implementation by Lionel:**
-> We can add a business card in the '/add' endpoint with the same fields as a profile, 
but we are adding our username into that card to recognize that this card belong to us (logged user).
I didn't implement the allowance of users to share their business cards due to a lack of time.
In order to do this, i would implement some "joints" while retrieving data from 'cards' collection.

Thank You for the Test
