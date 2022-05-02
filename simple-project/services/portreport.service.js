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
				var urlNecesario=await ctx.call("check.urlHelper",{pais:ctx.params.pais_ant});
				var conexion = mongoose.createConnection("mongodb://"+urlNecesario);				
				const base_ant = conexion.models.movimientos || conexion.model("movimientos", mongoose.Schema({
					id_solicitud: { type: Number },
					id_contenedor: { type: Number },
					pais_llegada: { type: String },
					id_cliente: { type: Number },
					peso: { type: Number },
					activo: { type: Boolean}
				}));

				// Busco la solicitud en la base del pais anterior
				const resp = await base_ant.find({"idsolicitud": ctx.params.id_solicitud, "activo": true});
				if(resp == null){
					return "No existe la solicitud";
				}

				// Inserto la solicitud en la base del pais actual (con el activo = true)
				var urlNecesario2=await ctx.call("check.urlHelper",{pais:ctx.params.puertoAnterior});
				var conexion2 = mongoose.createConnection("mongodb://"+urlNecesario2);				
				const base_act = conexion2.models.movimientos || conexion2.model("movimientos", mongoose.Schema({
					id_solicitud: { type: Number },
					id_contenedor: { type: Number },
					pais_llegada: { type: String },
					id_cliente: { type: Number },
					peso: { type: Number },
					activo: { type: Boolean}
				}));
				base_act.insertMany(JSON.parse(resp));
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