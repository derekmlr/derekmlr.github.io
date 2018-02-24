# derekmlr.github.io
My portfolio site for 2018 - [derekmlr.com](http://derekmlr.com)

## Running Locally
This project uses [Jekyll](https://jekyllrb.com/docs/quickstart/) to easily run off of Github Pages. To run locally, clone the repo and use Jekyll's serve command.

```
$ git clone https://github.com/derekmlr/derekmlr.github.io.git && cd derekmlr.github.io
$ bundle exec jekyll serve
```

Then visit the URL specified in the terminal feedback (usually http://127.0.0.1:4000 ).

## Development
There's only one webpage; index.html . JavaScript is within the /js/ folder and uses the JQuery 3.3.1 library. CSS is using the SCSS varation of SASS and stored in the /css/ folder. Jekyll automatically compiles all of this, so you only need to run Jekyll's serve command.

The whole site is built to the auto-generated /_site/ folder, which is served at the localhost address.