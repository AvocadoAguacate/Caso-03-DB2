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
	name: "check",
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
		 * permite revisar si un paquete cabe en un contenedor
		 *
		 * @param {String} pais
		 * 
		 */
		 urlHelper: {
			rest: {
				method: "GET",
				path: "/urlHelper"
			},
			params: {
				pais: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				var dbs=["192.168.18.73:27030,192.168.18.73:27032/puertos?replicaSet=uno","192.168.18.73:27031,192.168.18.73:27033/puertos?replicaSet=dos","192.168.18.73:27034,192.168.18.73:27035/puertos?replicaSet=tres"];
				var dbEsp;
				switch(ctx.params.pais){
					case 'Costa Rica':
						dbEsp=0;
						break;
					case 'Panama':
						dbEsp=1;
						break;
					case 'Colombia':
						dbEsp=2;
						break;
				}
				return dbs[dbEsp];
			}
		},
		
		/**
		 * permite revisar si un paquete cabe en un contenedor
		 *
		 * @param {String} puertoAnterior
		 * @param {String} nuevoPuerto
		 * @param {String} idContainer
		 * 
		 */
		 checkIn: {
			rest: {
				method: "GET",
				path: "/checkIn"
			},
			params: {
				puertoAnterior: "string",
				nuevoPuerto: "string",
				idContainer: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {

				var urlNecesario=await ctx.call("greeter.urlHelper",{pais:ctx.params.puertoAnterior});
				var conexion=mongoose.createConnection("mongodb://"+urlNecesario);				
				const Modelito5 = conexion.models.contenedores || conexion.model("contenedores", mongoose.Schema({
					id_contenedor: { type: Number },
					fecha_limite: { type: String },
					pais_A: { type: String },
					pais_B: { type: String },
					espacios: { type: Array },
					precio_kilogramo: { type: Number },
					peso_maximo: { type: Number }
				}));

				var obj= await Modelito5.find({"id_contenedor":20});
				var resp = await Modelito5.updateOne({"id_contenedor":25},{$set:{"fecha_limite":"2555/8/2022"}});
				var copia=obj[0]
				

				var urlNecesario2=await ctx.call("greeter.urlHelper",{pais:ctx.params.nuevoPuerto});
				var conexion=mongoose.createConnection("mongodb://"+urlNecesario2);
				const Modelito6 = conexion.models.contenedores || conexion.model("contenedores", mongoose.Schema({
					id_contenedor: { type: Number },
					fecha_limite: { type: String },
					pais_A: { type: String },
					pais_B: { type: String },
					espacios: { type: Array },
					precio_kilogramo: { type: Number },
					peso_maximo: { type: Number }
				},{versionKey: false}));
				await Modelito6.insertMany(obj);
				return copia;
			}
		},

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


