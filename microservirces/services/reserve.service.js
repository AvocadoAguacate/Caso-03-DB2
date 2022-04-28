"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "reserver",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Intenta reservar un espacio
		 *
		 * @param {String} name - User name
		 */
		reserve: {
			rest: "/reserve",
			async handler(ctx) {
        //set request info
        let request = {
          client_id: ctx.params.client_id,
          container_id: ctx.params.container_id,
          weight: ctx.params.weight,
          dimensions: [ctx.params.x, ctx.params.y, ctx.params.z]
        }
        //check request info
        if(!this.requestChecker(request)){
          return "Faltan datos";
        }
        //fake redis 
        let fakeRedis = [{container_id: 4343546}, {container_id: 434654321}];
        //find container
        if(fakeRedis.find(container_space => {
          return container_space.container_id === parseInt(request.container_id);
        }) === undefined){
          return `El conteiner ${request.container_id} no se encuentra disponible`;
        }
        //setiar en redis que el espacio ya no está disponible
        //all is ok
        return "Ok";
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
    //ok request = true
      requestChecker(request){
        return this.requestNullChecker(request)
      },
      requestNullChecker(request){
        let client_check = request.client_id != undefined;
        let container_check = request.container_id != undefined;
        let weight_check = request.weight != undefined;
        let x_check = request.dimensions[0] != undefined;
        let y_check = request.dimensions[1] != undefined;
        let z_check = request.dimensions[2] != undefined;
        return client_check && container_check && weight_check && x_check && y_check && z_check;
      }

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};