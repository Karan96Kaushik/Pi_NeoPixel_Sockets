import socketio
from aiohttp import web

sio = socketio.AsyncServer(async_mode='aiohttp')

# @sio.event

@sio.on('vent')
def another_event(sid, data):
    print("VENT")
    pass

@sio.event
def connect(sid, environ):
    print('connect ', sid)


def vent(sid, data):
    print("Data")
    pass
# app = tornado.web.Application(
#     [
#         (r"/socket.io/", socketio.get_tornado_handler(sio)),
#     ],
#     # ... other application options
# )

app = web.Application()
sio.attach(app)


if __name__ == '__main__':
    web.run_app(app)