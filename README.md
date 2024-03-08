# parsertime-replicate

This is a script that replicates the Parsertime production database to a replica database.
We connect to the production database and use `pg_dump` to dump the database to a file.
We then connect to the replica database and use `psql` to restore the database from the file.

To run:

Set the following environment variables:

```bash
PROD_DB_URL="postgres://user:password@host:port/dbname"
REPLICA_DB_URL="postgres://user:password@host:port/dbname"
```

Then run the following command to start the script:

```bash
bun run index.ts
```

We include a Dockerfile for running the script in a container. To build the container, run:

```bash
docker build -t parsertime-replicate .
```

To run the container, run:

```bash
docker run -e PROD_DB_URL="postgres://user:password@host:port/dbname" -e REPLICA_DB_URL="postgres://user:password@host:port/dbname" parsertime-replicate
```

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
