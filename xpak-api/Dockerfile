FROM ruby:3.1.4

RUN mkdir /api
WORKDIR /api

RUN apt-get update -qq \
&& apt-get install -y nodejs postgresql-client

COPY Gemfile Gemfile.lock ./

RUN bundle i
COPY . .

EXPOSE 8000

CMD ["rails", "server", "-b", "0.0.0.0"]