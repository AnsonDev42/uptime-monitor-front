# uptime-monitor-front
[![Docker Image CI](https://github.com/AnsonDev42/uptime-monitor/actions/workflows/docker-image.yml/badge.svg)](https://github.com/AnsonDev42/uptime-monitor/actions/workflows/docker-image.yml)
---
- This repo is the front-end implementation of the following project. 
- See [back-end implementation here](https://uptime-monitor-front.pages.dev)
---

###  Demo
Click [here](https://uptime-monitor-front.pages.dev) to see for yourself

![image](https://github.com/AnsonDev42/uptime-monitor-front/assets/58594437/9a119264-49b8-4f08-9810-6198456b27ad)
![image](https://github.com/AnsonDev42/uptime-monitor-front/assets/58594437/308529f3-e8f4-4f96-85e6-f845e572c603)



---

### Running / Building PART1/2 (for front-end)
Installing Bun (the front-end package manager): https://bun.sh/
- Install dependencies(only need to run once) : `bun install`
- Run for development: `bun run dev`
- Build for production: `bun build`

Fork this repo and you can easily deploy it for free in [Cloudflare Page](https://pages.cloudflare.com/), [Vercel](https://vercel.com/) and etc.

---

### Running / Building PART2/2 method1 **RECOMMENDED** (for backend-end)

Installing [Docker and Docker-compose](https://docs.docker.com/compose/install/)
- modify your configration in `docker-compose.yml` file if needed
- copy the `.env.dev` to `.env`, modify in `.env`
- docker-compose up

---

### Running / Building PART2: method2 (for backend-end)
Installing [peotry](https://python-poetry.org/) (the back-end package manager for python):
- copy the `.env.dev` to `.env`, modify in `.env`
- Install dependencies(only need to run once) : `poetry install`
- Install your postgresDB **and** rabbitMQ
- In one shell: `./manage.py runserver`
- In another new shell: `celery -A uptimemonitor worker --loglevel=INFO`
- In another new shell: `celery -A uptimemonitor beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler`
  



---

### Objectives:
- a uptime dashboard ([Django-backend](https://github.com/AnsonDev42/uptime-monitor) + [NextJS-frontend(Client-Side-Render) in **TypeScript**](https://github.com/AnsonDev42/uptime-monitor-front)
- notify user when server is down and when server is restored
