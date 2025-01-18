import { WebSocketServer } from 'ws';
import { parse as urlParse } from 'url';
import { createClient } from 'redis';
import { redisconfig } from '../config/redis.config.js';
export default class wsServer {
    constructor(server) {
        this.server = new WebSocketServer({ server });
        this.redisPublisher = createClient(redisconfig);
        this.redisSubscriber = createClient(redisconfig);
        this.redisPublisher.on('error', (err) => {
            console.error('Redis Publisher Error:', err);
        });

        this.redisSubscriber.on('error', (err) => {
            console.error('Redis Subscriber Error:', err);
        });

        this.redisPublisher.on('connect', () => {
            console.log('Redis Publisher connected');
        });

        this.redisSubscriber.on('connect', () => {
            console.log('Redis Subscriber connected');
        });
        this.redisPublisher.connect();
        this.redisSubscriber.connect();
        this.vendorConnections = {};
        this.redisSubscriber.on("message", (channel, message) => {
            console.log(`redis recieve ${message} from ${channel}`);
            const vendorId = channel.split(':')[2];
            this.vendorConnections[vendorId].forEach((vendorConnection) => {
                vendorConnection.send(message);
            });
        });
        this.server.on("connection", (connection, request) => {
            const { id, identity } = urlParse(request.url, true).query;
            console.log(`${identity} ${id} connect websocket`);
            if (identity === 'vendor') {
                if (!(id in this.vendorConnections)) {
                    this.vendorConnections[id] = new Set();
                    this.redisSubscriber.subscribe(`notifications:vendor:${id}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(`subscribed to notifications:vendor:${id}`);
                        }
                    });
                }
                this.vendorConnections[id].add(connection);
            }
            connection.on('message', bytesmsg => {
                const message = JSON.parse(bytesmsg.toString());
                console.log(`ws recieve ${message}`);
                const vendorId = message.Vendor_ID;
                this.redisPublisher.publish(`notifications:vendor:${vendorId}`, JSON.stringify(message));
            });
            connection.on("close", (code) => {
                console.log(`${identity} ${id} disconnected websocket`);
                if (identity === 'vendor') {
                    this.vendorConnections[id] = this.vendorConnections[id].delete(connection);
                    if (this.vendorConnections[id].size === 0) {
                        this.redisSubscriber.unsubscribe(`notifications:vendor:${id}`);
                        this.vendorConnections.delete(id);
                    }
                }
            })
        })
    }
}