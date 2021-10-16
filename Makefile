#
#   Makefile - for the OneTable Controller
#

AWS_PROFILE ?=
PROFILE     ?= qa
CONTROLLER  ?= controller

ifndef SHOW
.SILENT:
endif

all: run

configure:
	npm install

build:
	echo Building for profile $(PROFILE)
	npm run build

package:
	echo sls package -s $(PROFILE) -v
	sls package -s $(PROFILE) -v

update:
	echo sls deploy -s $(PROFILE) -f $(CONTROLLER) -v
	sls deploy -s $(PROFILE) -f $(CONTROLLER) -v

publish:
	echo
	if [ "$(PROFILE)" != "qa" -a "$(FORCE)" = "" ] ; then \
		echo ; \
		/bin/echo -n "CONFIRM: about to publish \"$(PROFILE)\": " ; read x ; \
	fi
	sls deploy -s $(PROFILE) -v

promote: build publish

debug:
	# echo export SLS_DEBUG=* && node --debug ./node_modules/.bin/serverless offline  --httpPort 5000 --lambdaPort 5001 -s dev
	code .

run:
	echo sls offline --httpPort 4000 --lambdaPort 4002 --noAuth -s dev
	sls offline --httpPort 4000 --lambdaPort 4002 --noAuth -s dev
