module.exports = {
    name: "helper",

    events: {
        "hello.called" (payload) {
            this.logger.info("helper service caught an event");
            this.logger.info(payload);
        }
    }
};