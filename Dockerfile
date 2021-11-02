FROM fonoster/base
COPY . /scripts
RUN ./install.sh
USER fonoster
# HEALTHCHECK CMD curl --fail http://localhost:3000/ping || exit 1