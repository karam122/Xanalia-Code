FROM public.ecr.aws/v9j3m0a2/node14:latest
#RUN apt install make gcc g++ python

RUN mkdir -p /app/api
WORKDIR /app/api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run translate
#RUN cp .env.example .env

RUN npm run build
RUN ls -a


EXPOSE 3000

CMD ["npm", "run", "start"]
