# Logging facility

This repo is a demo repo for any frontend app that needs to log
into a centralized (probably corporate) journal.

## Objectives

It is often wanted to centralize logs.
For server to server communication, that happens behind closed curtains,
_ie_. a VPN or firewall.
For frontend apps, an open endpoint must be opened, which raises a number
of security questions.

This repository aims at providing a generic configuration for such scenarii
by focusing on security and stability of the existing infrastructure.

## Specifics

Your infrastructure is supposed to have a central logging facility,
with a technology of your choosing.

This app config provides a public endpoint, proxied by NGINX,
to your logging facility. NGINX is configured as to avoid
DDoS and probably some attacks by voluntarily limiting the
number of requests and connections to the service.

## Requirements

### Demo Infra 

You will need `docker-compose` to run the demo infra.

Simply go to the folder `infra` and type :

```
$ docker-compose up
```

That will open the port `8088` of your machine
and make accessible the endpoint `http://localhost:8088`.

### Frontend

The frontend app is already built.

Simply run

```
python -m SimpleHTTPServer 8000
```

and go to `http://localhost:8000` with your browser.

#Expectation

After you have started it all, click on the text in the page to generate an error.

When you did, look at you containers' logs, your error should appear.


# Comments

## Throttling

Due to the heavy configuration of nginx for throttling the connections and requests,
it appears unnecessary to throttle client-side.
Furthermore, the browser as well prevents too many connections to fire up
at the same time.

All the code related to throttling has been removed from the JS code.

# License

MIT

