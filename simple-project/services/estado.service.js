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
				var lol=256
				;
				//mongoose.connect("192.168.18.73:27034,192.168.18.73:27035/puertos?replicaSet=tres");
				var bds=["192.168.18.73:27030,192.168.18.73:27032/puertos?replicaSet=uno","192.168.18.73:27031,192.168.18.73:27033/puertos?replicaSet=dos","192.168.18.73:27034,192.168.18.73:27035/puertos?replicaSet=tres"];
				var paises=["Costa Rica", "Panamá","Colombia","Mexico"];
				for(let i=0;i<3;i++){
					var est=mongoose.createConnection("mongodb://"+bds[i]);
					const Modelito3 = est.models.contenedores || est.model("contenedores", mongoose.Schema({
						id_contenedor: { type: Number },
						fecha_limite: { type: String },
						pais_A: { type: String },
						pais_B: { type: String },
						espacios: { type: Array },
						precio_kilogramo: { type: Number },
						peso_maximo: { type: Number }
					}));
					var resp = await Modelito3.find({"id_contenedor":lol});
					if(resp[0].precio_kilogramo==14.883){
						return "Su paquete se encuentra en "+paises[i];
					}
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


