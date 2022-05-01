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
	name: "portreport",

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
     * Adapter
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
		 *
		 * @param {String} id_solicitud - Id solicitud
		 * @param {String} pais_ant - Pais anterior
		 * @param {String} pais_act - Pais actual
		 * 
		 * Paises pueden ser Mexico, CostaRica, Panama, Colombia
		 */
        report: {
            rest: "/port_report",
            params: {
                id_solicitud: "string",
				pais_ant: "string",
				pais_act: "string"
            },
			/** @param {Context} ctx  */
			async handler(ctx) {
				// Me conecto a las bases de los paises anterior y actual
				const base_ant = new MongooseAdapter("mongodb://localhost:"+ctx.params.pais_ant+"Mov");
				const base_act = new MongooseAdapter("mongodb://localhost:"+ctx.params.base_act+"Mov");

				// Busco la solicitud en la base del pais anterior
				const resp = await base_ant.find({"idsolicitud": ctx.params.id_solicitud, "activo": true});
				if(resp == null){
					return "No existe la solicitud";
				}

				// Inserto la solicitud en la base del pais actual (con el activo = true)
				base_act.insert(JSON.parse(resp));

				// Cambio el activo a false en la base del pais anterior
				resp.activo = false;
				await resp.save();

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