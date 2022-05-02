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
				var dbs=["25.6.50.193:27020,25.5.181.178:27022/movimientos?replicaSet=rep_mov_costarica","25.5.181.178:27020,25.77.2.238:27022/movimientos?replicaSet=rep_mov_panama","25.77.2.238:27020,25.77.226.95:27022/movimientos?replicaSet=rep_mov_colombia","25.77.226.95:27020,25.6.50.193:27022/movimientos?replicaSet=rep_mov_mexico"]
				//var dbs=["192.168.18.73:27030,192.168.18.73:27032/puertos?replicaSet=uno","192.168.18.73:27031,192.168.18.73:27033/puertos?replicaSet=dos","192.168.18.73:27034,192.168.18.73:27035/puertos?replicaSet=tres"];
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
					case 'Mexico':
						dbEsp=3;
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

				var urlNecesario=await ctx.call("check.urlHelper",{pais:ctx.params.puertoAnterior});
				var conexion=mongoose.createConnection("mongodb://"+urlNecesario);				
				const Modelito5 = conexion.models.movimientos || conexion.model("movimientos", mongoose.Schema({
					id_solicitud: { type: Number },
					id_contenedor: { type: Number },
					pais_llegada: { type: String },
					id_cliente: { type: Number },
					peso: { type: Number },
					activo: { type: Boolean}
				}));

				var obj= await Modelito5.find({"id_contenedor":ctx.params.idContainer});
				var resp = await Modelito5.updateOne({"activo":false});
				var copia=obj[0]
				

				var urlNecesario2=await ctx.call("check.urlHelper",{pais:ctx.params.nuevoPuerto});
				var conexion=mongoose.createConnection("mongodb://"+urlNecesario2);
				const Modelito6 = conexion.models.movimientos || conexion.model("movimientos", mongoose.Schema({
					id_solicitud: { type: Number },
					id_contenedor: { type: Number },
					pais_llegada: { type: String },
					id_cliente: { type: Number },
					peso: { type: Number },
					activo: { type: Boolean}
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


