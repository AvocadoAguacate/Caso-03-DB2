"use strict";

const { BrokerNode, Service, Cachers, Transporter, ServiceBroker } = require("moleculer");
const { cacher } = require("../moleculer.config");
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const mongoose = require("mongoose");
const { model } = require("mongoose/lib");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "findrequest",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

    mixins: [DbService],

    /*
     * modelos del adaptador
     */
    adapter: new MongooseAdapter("mongodb://localhost:27017/solicitud"),
	model: mongoose.models.solicitud || mongoose.model("solicitudes", mongoose.Schema({
        id_solicitud : { type: String },
        id_contenedor : { type: String },
        paisllegada : { type: String },
        activo : { type: Boolean}
    }, { versionKey: false })),

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Debe encontrar la solicitud 
		 *
		 * @param {String} id_solicitud - Id solicitud
		 */
        servicefind: {
            rest: "/find_request",
            params: {
                id_solicitud: "string"
            },
			/** @param {Context} ctx  */
			async handler(ctx) {
                const contdb = 4
                const data = ctx.params.id_solicitud;
                const base1 = "mongodb://localhost:MexicoMov"
                const base2 = "mongodb://localhost:CostaRicaMov"
                const base3 = "mongodb://localhost:PanamaMov"
                const base4 = "mongodb://localhost:ColombiaMov"
                for( let i = 1; i <= contdb; i++) {
                    switch(i){
                        case 1:
                            const con01 = new MongooseAdapter("mongodb://"+base1);
                            const resp01 = await con01.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp01));
					        console.log("Datos base de datos");
					        return resp01;
                        case 2:
                            const con02 = new MongooseAdapter("mongodb://"+base2);
                            const resp02 = await con02.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp02));
					        console.log("Datos base de datos");
					        return resp02;
                        case 3:
                            const con03 = new MongooseAdapter("mongodb://"+base3);
                            const resp03 = await con03.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp03));
					        console.log("Datos base de datos");
					        return resp03;
                        case 4:
                            const con04 = new MongooseAdapter("mongodb://"+base4);
                            const resp04 = await con04.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp04));
					        console.log("Datos base de datos");
					        return resp04;    
                        default:
                            return null;
                    }
                }
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