# coding=utf8
__author__ = 'Sam Raker'

import os
import json
from random import sample
import urlparse

import redis

with open('config.json') as f:
    config = json.load(f)

r_url = urlparse.urlparse(os.environ.get("REDISCLOUD_URL"))
r = redis.StrictRedis(host=r_url.hostname, port=r_url.port, password=r_url.password)

four_rng = xrange(len(r.keys("*_4")) - 1)
eight_rng = xrange(len(r.keys("*_8")) - 1)


def get_fours(dupes=True):
    if dupes:
        return r.get('{}_4'.format(sample(four_rng, 1)[0])), r.get('{}_4'.format(sample(four_rng, 1)[0]))
    else:
        x, y = sample(four_rng, 2)
        return r.get('{}_4'.format(x)), r.get('{}_4'.format(y))


def get_eights():
    s = r.get('{}_8'.format(sample(eight_rng, 1)[0]))
    return s[:4], s[4:]