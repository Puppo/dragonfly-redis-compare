# DragonFly vs Redis in your poor machine

## Setup

```bash
npm ci

docker-compose up -d
```

Now you have a Redis instance up and running on port 6380 and a DragonFly instance up and running on port 6379.

## Start Fastify server

```bash
npm run start:local
```

Now you have two Fastify servers up and running on ports 3000 (Redis) and 3001 (DragonFly).

## Run the benchmark

```bash
npm run benchmark
```

Follow the instructions on the screen to run the benchmarks.
The result will be printed on the screen at the end of the benchmark.