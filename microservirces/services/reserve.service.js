"use strict";

const {
	BrokerNode,
	Service,
	Cachers,
	Transporter,
	ServiceBroker,
} = require("moleculer");
const { cacher } = require("../moleculer.config");
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const mongoose = require("mongoose");
const { model } = require("mongoose/lib");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "reserver",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	mixins: [DbService],

	adapter: new MongooseAdapter("mongodb://localhost:27017/puertos"),
	model:
		mongoose.models.contenedores ||
		mongoose.model(
			"contenedores",
			mongoose.Schema(
				{
					id_contenedor: { type: Number },
					fecha_limite: { type: String },
					pais_A: { type: String },
					pais_B: { type: String },
					espacios: { type: Array },
					precio_kilogramo: { type: Number },
					peso_maximo: { type: Number },
					activo: { type: Boolean}
				},
				{ versionKey: false }
			) 
		) ||
		mongoose.model(
			"solicitudes",
			mongoose.Schema(
				{
					id_solicitud: { type: Number },
					id_contenedor: { type: Number },
					pais_llegada: { type: String },
					id_cliente: { type: Number },
					peso: { type: Number },
					activo: { type: Boolean}
				},
				{ versionKey: false }
			)
		)
	,

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
				const request = {
					id_client: ctx.params.id_client,
					id_contenedor: ctx.params.id_contenedor,
					weight: ctx.params.weight,
					country: ctx.params.country
				};
				//check request info
				if (!this.requestChecker(request)) {
					return "Faltan datos";
				}
				//buscar el contenedor *****
				const Cont = mongoose.models.contenedores;
				const resp = await Cont.find({"id_contenedor":ctx.params.container_id, "activo": true});
				if(resultado == null){
					return "Contenedor ocupado";
				}
				const json_resp = JSON.parse(resp);
				const key = json_resp.pais_A + json_resp.pais_B; //key de redis que tengo que actualizar o borrar
				//set como ocupado **
				resp.activo = false;
				await resp.save();
				//set el redis *****
				// guardar en mov
				const doc = new mongoose.models.solicitudes({
					id_solicitud: json_resp.id_contenedor,
					id_contenedor: json_resp.id_contenedor,
					pais_llegada: json_resp.pais_B,
					peso: request.weight,
					id_cliente: request.id_client,
					activo: true
				});
				//debería cambiar la base en la que guardo ****
				await doc.save();
				//all is ok
				return "Ok";
			},
		},
	},

	/**
	 * Events
	 */
	events: {},

	/**
	 * Methods
	 */
	methods: {
		//ok request = true
		requestChecker(request) {
			return this.requestNullChecker(request);
		},
		requestNullChecker(request) {
			let client_check = request.id_client != undefined;
			let container_check = request.id_contenedor != undefined;
			let weight_check = request.weight != undefined;
			return (
				client_check &&
				container_check &&
				weight_check 
			);
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
