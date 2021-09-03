FROM fonoster/base
COPY . /scripts
RUN ./install.sh
USER fonos
# HEALTHCHECK CMD curl --fail http://localhost:3000/ping || exit 1