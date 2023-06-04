# TrueNorth Calculator

This is a code challenge, about creating a calculator web application 
that provides some specific functionalities as the following:

Support operations like:
 
 - Addition
 - Subtraction
 - Multiplication
 - Division
 - Square Root
 - Random numbers

Each operation has a cost:

| Operation      | Cost |
|----------------|------|
| Addition       | 25   |
| Subtraction    | 25   |
| Multiplication | 50   |
| Division       | 50   |
| Square Root    | 80   |
| Random number  | 100  |


## Design Decisions

I have decided to implement this web application using NextJS version 13, it was a risky decision 
to be honest because this is a cutting hedge technology and I have to invest a lot of time solving 
difficult problems like the following 

- Set up the Authentication mechanism, I decided to use Clerk, but I had a lot 
of difficulties deploying the web application in Railway environment, finally I moved it to Vercel environment
- When a user is sign up I populate the Users table with a new entry, for this purpose
I have created a webhook that is triggered each time a new user is signed up, I spent 
a couple of hours figuring out how to expose and endpoint with some security measures that could do the job

## Configuration

Checkout the project from https://github.com/paravena/truenorth-calculator
Install dependencies with npm install command

## Environment Variables 

There are a lot of Environment Variables to Set up

| Environment Variable                | Description           |
|-------------------------------------|-----------------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   | Clerk Public key      |
| CLERK_SECRET_KEY                    | Clerk secret          |
| NEXT_PUBLIC_CLERK_SIGN_IN_URL       | /sign-in              |
| NEXT_PUBLIC_CLERK_SIGN_UP_URL       | /sign-up              |
| NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL | /                     |
| NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL | /                     |
| DATABASE_URL                        | Postgres Database URL |
| POSTGRES_URL                        | Postgres Database URL |
| POSTGRES_PRISMA_URL                 | Postgres Database URL |
| POSTGRES_URL_NON_POOLING            | Postgres Database URL |
| POSTGRES_USER                       | Database username     |
| POSTGRES_HOST                       | Database host         |
| POSTGRES_PASSWORD                   | Database password     |
| POSTGRES_DATABASE                   | Database name         |
| WEBHOOK_SECRET                      | Clerk webhook secret  |
| NEXT_PUBLIC_RANDOM_URL              | Random Url Endpoint   |

Note: Is not ideal to have so many Database related environment variables, 
When I was deploying this web app in Railway I had only one but when I migrated 
this to Vercel, they starting growing, I didn't have enough time to fix this issue

## Database setup

Run following commands

npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

## Authentication Mechanism

I decided to use an OAuth provider for this purpose, in the past I have used Auth0, 
but nowadays there is no compatibility with NextJS version 13. I decided to try Clerk (https://clerk.com), 
which has very good documentation, I found a couple of tutorials and everything when smoothly until
I deployed the web app in Railway environment and try it, the web app crashed in an infinite redirect loop, 
I realised that this was a reported issue in Discord so in a desperate decision I deploy the web app in Vercel. 
Anyway to configure this Clerk provider you need to create an Application in Clerk
Take the Public KEY and Secret and set them as environment variables. See this documents

https://clerk.com/docs
And this is very useful to setup the Webhook which in this web app is /users/webhook
https://beta-docs.clerk.com/users/guides/sync-data-to-your-backend
Also you will have an issue if you want to run this locally because the webhook
endpoint should be visible consider using Ngrok (https://ngrok.com/) in this case

Unit Testing

I did a couple of test for the Calculator component, I didn't have enough time :(

## Time Dedicated to the Project

| Date                  | Hours     |
|-----------------------|-----------|
| May 27                | 4 hours   |
| May 28                | 6 hours   |
| May 29                | 2 hours   |
| May 30                | 1 hour    |
| June 02               | 2 hours   |
| June 03               | 6 hours   |
| June 04               | 6 hours   |
| Total                 | 33 hours  |
