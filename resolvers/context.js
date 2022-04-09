// ! passing context from Appolo server constructor is not working
// ! so use this context.js to as substitution
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub()
export {pubsub}