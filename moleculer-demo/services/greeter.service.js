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
	name: "greeter",

	/**
	 * Settings
	 */
	settings: {
		fields: [
			"id_contenedor",
			"fecha_limite",
			"pais_A",
			"pai_B",
			"espacios",
			"precio_kilogramo",
			"peso_maximo"
		]
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	mixins: [DbService],

	/*adapter: new MongooseAdapter("mongodb://"+ //David S
	"25.5.181.178:27019,25.77.2.238:27021/puertos?replicaSet=rep_pais_panama"), //Esteban
	//"25.77.2.238:27019,25.77.226.95:27021,"+ //Mauricio
	//"25.77.226.95:27019,25.6.50.193:27021"), //David
	model: mongoose.models.contenedores || mongoose.model("contenedores", mongoose.Schema({
        id_contenedor : { type: Number },
		fecha_limite : { type: String },
		pais_A : { type: String },
		pais_B : { type: String },
		espacios : { type: Array },
		precio_kilogramo : { type: Number },
		peso_maximo : { type: Number }
    }, { versionKey: false })),*/

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello"
			},
			async handler() {
				return "Hello Moleculer";
			}
		},

		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			rest: "/welcome",
			params: {
				paisSalida: "string",
				paisDestino: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const key = ctx.params.paisSalida + ctx.params.paisDestino;
				const resultado = await ctx.broker.cacher.get(key);
				var conn;
				if (ctx.params.paisSalida == "Panama"){
					console.log("ENTRA A PANAMA");
					conn = mongoose.createConnection('mongodb://"25.5.181.178:27019,25.77.2.238:27021/puertos?replicaSet=rep_pais_panama"');
				}
				console.log("Crea el modelo");
				var Model = conn.model("contenedores", mongoose.Schema({
					id_contenedor: { type: Number },
					fecha_limite: { type: String },
					pais_A: { type: String },
					pais_B: { type: String },
					espacios: { type: Array },
					precio_kilogramo: { type: Number },
					peso_maximo: { type: Number }
				}));
				console.log("Termina el modelo");
				
				console.log("Resultado: ");
				if(resultado == null){
					//llamar a la base de datos
					//const Cont = mongoose.models.contenedores;
					console.log("ENTRA A LA BASE DE DATOS");
					const resp = await Model.find({"pais_A":ctx.params.paisSalida,"pais_B": ctx.params.paisDestino});
					await ctx.broker.cacher.set(key, JSON.stringify(resp));
					console.log("Datos base de datos");+
					conn.close();
					return resp;
				}
				else{
					console.log("Datos cache");
					conn.close();
					return JSON.parse(resultado);
				}
			}
		},

		test: {
			method: "GET",
			rest: "/test",
			/** @param {Context} ctx  */
			async handler(ctx) {
				//ctx.broker.cacher.set("CR7", 7);
				const dato = await ctx.broker.cacher.get("CR7");
				console.log("dato", dato);
				return dato;
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
