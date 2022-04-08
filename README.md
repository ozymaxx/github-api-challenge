# Node/TypeScript exercise

## Setup

`yarn install && yarn start`

## Instructions

See document set separately.

## Run Ingest Scripts

`yarn ingest-pull`
`yarn ingest-commits`

Feel free to modify these, or write your own.

**If you hit a GitHub API rate limit**, you can use a personal access token:
1. Create a `.env` file at the project root and add `PERSONAL_ACCESS_TOKEN=your_token`

2. Uncomment the headers in `ingest-pull.ts` and `ingest-commits.ts`

## Test queries

`yarn query`
