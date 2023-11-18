export const eventBus = class EventBus {

    static events = [];
    static DEBUG_MODE = false;

    static emit(event, ...args) {

        this.DEBUG_MODE ? console.log(`EventBus: Emitting event ${event}`) : null;

        if(eventBus.events[event] === undefined) {
            return;
        }
        eventBus.events[event].forEach(callback => {
            callback(...args);
        });
    }

    static on(event, callback) {

        this.DEBUG_MODE ? console.log(`EventBus: Registering event ${event} on`, callback) : null;

        if(!eventBus.events[event]) {
            eventBus.events[event] = [];
        }
        eventBus.events[event].push(callback);
    }
}