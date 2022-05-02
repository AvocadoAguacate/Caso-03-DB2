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
	name: "estado",
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
		 * nos dice en qué pais está un contenedor
		 *
		 * @param {String} numOrden
		 * 
		 */
		estado: {
			method: "get",
			params:{
				numOrden: "string"
			},
			rest: "/estado",
			/** @param {Context} ctx  */
			async handler(ctx) {
				var bds=["25.6.50.193:27020,25.5.181.178:27022/movimientos?replicaSet=rep_mov_costarica","25.5.181.178:27020,25.77.2.238:27022/movimientos?replicaSet=rep_mov_panama","25.77.2.238:27020,25.77.226.95:27022/movimientos?replicaSet=rep_mov_colombia","25.77.226.95:27020,25.6.50.193:27022/movimientos?replicaSet=rep_mov_mexico"]
				//var bds=["192.168.18.73:27030,192.168.18.73:27032/puertos?replicaSet=uno","192.168.18.73:27031,192.168.18.73:27033/puertos?replicaSet=dos","192.168.18.73:27034,192.168.18.73:27035/puertos?replicaSet=tres"];
				var paises=["Costa Rica", "Panamá","Colombia","Mexico"];
				for(let i=0;i<4;i++){
					var est=mongoose.createConnection("mongodb://"+bds[i]);
					const Modelito3 = est.models.movimientos || est.model("movimientos", mongoose.Schema({
						id_solicitud: { type: Number },
						id_contenedor: { type: Number },
						pais_llegada: { type: String },
						id_cliente: { type: Number },
						peso: { type: Number },
						activo: { type: Boolean}
					}));
					var resp = await Modelito3.find({"id_solicitud":ctx.params.numOrden,"activo":true});
					if(resp!=null)
						return "Su paquete se encuentra en "+paises[i];
					est.close();
				};
				return "Este contenedor no existe";				  
		},
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


