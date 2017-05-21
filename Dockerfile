FROM keyax/ubuntu_core

LABEL maintainer="yones.lebady AT gmail.com" \
      keyax.os="ubuntu core" \
      keyax.os.ver="16.04 xenial" \
      keyax.vendor="Keyax" \
      keyax.app="Nodejs 7.5.0" \
      keyax.app.ver="2.2"

# RUN groupadd -r nodejs && useradd -r -g nodejs nodejs --create-home nodejs
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# gpg keys listed at https://github.com/nodejs/node
#RUN ["/bin/bash", "-c",  "set -ex; \
#  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5; \
#  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B9AE9905FFD7803F25714661B63B535A4C206CA9; \
#  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1; \
#  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93; \
#  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8; \
#  gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D"]

#gpg --keyserver pool.sks-keyservers.net --recv-keys 94AE36675C464D64BAFA68DD7434390BDBE9B9C5
#gpg --keyserver pool.sks-keyservers.net --recv-keys FD3A5288F042B6850C66B31F09FE44734EB7990E
#gpg --keyserver pool.sks-keyservers.net --recv-keys 71DCFD284A79C3B38668286BC97EC7A07EDE3FC1
#gpg --keyserver pool.sks-keyservers.net --recv-keys DD8F2338BAE7501E3DD5AC78C273792F7D83545D
#gpg --keyserver pool.sks-keyservers.net --recv-keys C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8
#gpg --keyserver pool.sks-keyservers.net --recv-keys B9AE9905FFD7803F25714661B63B535A4C206CA9
#gpg --keyserver pool.sks-keyservers.net --recv-keys 56730D5401028683275BD23C23EFEFE93C4CFFFE

RUN ["/bin/bash", "-c",  "set -ex; \
    for key in \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
  ;  do gpg --keyserver ha.pool.sks-keyservers.net --recv-keys $key ; done"]

#    apt-key adv --recv-key --keyserver pool.sks-keyservers.net $key || \
#    apt-key adv --recv-key --keyserver pgp.mit.edu $key || \
#    apt-key adv --recv-key --keyserver keyserver.pgp.com $key

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 7.10.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

## RUN su node \
## && cd /home/node \
## && npm init --yes \
# for building Couchbase Nodejs driver from source : make gcc ...
## && apt-get update && apt-get install --assume-yes --no-install-recommends build-essential \
## && npm install -g couchbase \
#   npm install --save couchbase-promises && \
#   npm install --save ottoman && \
#   npm install --save couchbase --no-bin-links && \
#   npm install "git+https://github.com/couchbase/couchnode.git#master" && \
#   npm install prebuild &&  \
## && apt-get remove build-essential --assume-yes \
#   remove dependencies
#    apt-get autoremove build-essential --assume-yes && \
#   remove dependent packages
#    apt-get purge build-essential && \
# remove packages installed by other packages and no longer needed purge configs
## && apt-get autoremove --purge --assume-yes \
#   remove the aptitude cache in /var/cache/apt/archives frees 0MB
## && apt-get clean \
# delete 27MB all the apt list files since they're big and get stale quickly
## && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
# this forces "apt-get update" in dependent images, which is also good

RUN su node
COPY package.json /home/node/
RUN cd /home/node \
 && npm init --yes \
 && npm install -g nodemon \
 && npm install -g --no-optional pm2 \
# && npm install -g strongloop \
# && npm install -g phonegap@latest \
&& npm install --save builtin-modules \
## && npm install --save http \
## && npm install --save https \
## && npm install --save fs \
## && npm install --save assert \
# && npm install --save jquery \
 && npm install --save socket.io \
 && npm install --save ws \
 && npm install --save express \
 && npm install --save bluebird \
 && npm install --save mysql \
 && npm install --save mongodb \
 && npm install --save mongoose \
 && npm install --save leaflet \
 && npm install --save d3

# COPY index.js /home/node/index.js
# RUN chmod +x /home/server.js
# VOLUME /home/node/index.js

# empty directory not allowed throws error:  no such file or directory
# ADD 1 layer,untar,url~; COPY 3 layers
# ADD www/index.js /home/node/
ADD www/js /home/node/js
ADD www/img /home/node/img
ADD www/css /home/node/css
ADD www/fonts /home/node/fonts
ADD www/data /home/node/data
WORKDIR /home/node

EXPOSE 8080 8090
# CMD [ "pm2-docker", "index.js"]
CMD [ "nodemon", "-L", "--watch", "/home/node", "js/index.js"]
