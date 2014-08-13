# coding=utf8
__author__ = 'Sam Raker'

import os
import json
import urlparse

import redis


def fil_to_redis(rdb, fmt, in_f, offset=0):
    pipe = rdb.pipeline()
    with open(in_f) as f:
        l = [x.rstrip() for x in f.readlines()]
    for idx, w in enumerate(l):
        pipe.set(fmt.format(idx + offset), w.upper())
    pipe.execute()
    return idx + offset


def setup(cfg_file="config.json"):
    with open(cfg_file) as f:
        config = json.load(f)
    r_url = urlparse.urlparse(os.environ.get("REDISCLOUD_URL"))
    r = redis.StrictRedis(host=r_url.hostname, port=r_url.port, password=r_url.password)
    r.flushdb()
    for db in config:
        fmt = config[db]['fmt']
        offset = 0
        for source in config[db]['sources']:
            offset += fil_to_redis(r, fmt, source, offset)