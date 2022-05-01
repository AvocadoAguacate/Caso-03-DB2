"use strict";

const { BrokerNode, Service, Cachers, Transporter, ServiceBroker } = require("moleculer");
const { cacher } = require("../moleculer.config");
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const mongoose = require("mongoose");
const { model, Schema } = require("mongoose/lib");

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
    //adapter: new MongooseAdapter("mongodb://localhost:27017/solicitud"),
    /*adapter: new MongooseAdapter("mongodb://localhost:27051/movimiento"),
	model: mongoose.models.solicitud || mongoose.model("Solicitud", mongoose.Schema({
        id_solicitud : { type: Number },
        id_contenedor : { type: Number },
        paisllegada : { type: String },
        activo : { type: Boolean}
    }, { versionKey: false })),*/

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
            rest: "/findrequest",
            params: {
                id_solicitud: Number
            },
			/** @param {Context} ctx  */
			async handler(ctx) {
                const contdb = 2
                const data = ctx.params.id_solicitud;
                var resp;
                
                //const base1 = "mongodb://localhost:MexicoMov"
                //const base2 = "mongodb://localhost:CostaRicaMov"
                // modelo
                const myschema = new mongoose.Schema({"id_solicitud" : Number, "id_contenedor": Number, "paisllegada": String, "activo": Boolean});
                //const Solicitud = mongoose.model('Solicitud', myschema);

                for( let i = 1; i <= contdb; i++) {
                    switch(i){
                        case 1:
                            /*
                            const con01 = new MongooseAdapter("mongodb://"+base1);
                            const resp01 = await con01.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp01));
					        console.log("Datos base de datos");
					        return resp01;*/
                            //connection
                            const connection01 = mongoose.createConnection('mongodb://localhost:27051/movimiento');
                            const Solicitud01 = connection01.model('Solicitud', myschema);
                            resp = resp + await Solicitud01.find({"id_solicitud" : data});
                            break;
                        case 2:
                            /*
                            const con02 = new MongooseAdapter("mongodb://"+base2);
                            const resp02 = await con02.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp02));
					        console.log("Datos base de datos");
					        return resp02;*/
                            const connection02 = mongoose.createConnection('mongodb://localhost:27052/movimiento');
                            const Solicitud02 = connection02.model('Solicitud', myschema);
                            resp = resp + await Solicitud02.find({"id_solicitud" : data});
                            break;
                        case 3:
                            /*
                            const con03 = new MongooseAdapter("mongodb://"+base3);
                            const resp03 = await con03.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp03));
					        console.log("Datos base de datos");
					        return resp03;*/
                            break;
                        case 4:
                            /*
                            const con04 = new MongooseAdapter("mongodb://"+base4);
                            const resp04 = await con04.find({"idsolicitud": ctx.params.id_solicitud, "activo": true})
                            await ctx.broker.cacher.set(data, JSON.stringify(resp04));
					        console.log("Datos base de datos");
					        return resp04;  */
                            break;
                        default:
                            return null;
                    }
                }
                return resp;
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