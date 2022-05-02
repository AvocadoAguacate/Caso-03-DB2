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
                id_solicitud: "number"
            },
			/** @param {Context} ctx  */
			async handler(ctx) {
                const data = ctx.params.id_solicitud;
                var resp;
                
                var conecciones = ['25.77.46.90:27020/mov_costarica?rep_mov_costarica',
                    '25.5.181.178:27020/mov_panama?rep_mov_panama',
                    '25.77.2.238:27020/mov_colombia?rep_mov_colombia',
                    '25.77.226.95:27020/mov_mexico?rep_mov_mexico',
                ];
                var pais = ["Costa Rica", "Panama", "Colombia", "Mexico"];
                const contdb = conecciones.length;

                for( let i = 0; i < contdb; i++) {
                    var connection = mongoose.createConnection("mongodb://"+conecciones[i]);
                    var myschema = connection.model.solicitud || connection.model("solicitud", mongoose.Schema({
                        id_solicitud: { type: Number },
                        id_contenedor: { type: Number },
                        pais_llegada: { type: String },
                        id_cliente: { type: Number },
					    peso: { type: Number },
                        activo: { type: Boolean }
                    }));
                    var resp = await myschema.find({"id_solicitud" : data, "activo": true});
                    if(resp[0].id_solicitud == data && resp[5].activo ){
                        return "La informacion se encontro en: "+ pais[i]+"\n la informacion es:"+resp;
                    }
                    connection.close();
                };
                return "No se encontro la información";

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