# New-York-Concerts

A simple webserver that generates a bare bones list of upcoming concerts via JamBase

See it in action at
	http://concertlist.nyc

Requires REDIS for caching results, if no Redis server is configured results will be stored in memory only.

Set API key and Redis server as Config Variables JB_APIKEY and REDIS_URL or manually in config.js, other config settings can be modified as well.

