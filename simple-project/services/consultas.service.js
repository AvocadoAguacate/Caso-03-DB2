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
	name: "consultas",
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
		 * @param {String} medida1
		 * @param {String} medida2
		 * @param {String} medida3
		 * @param {String} medida4
		 * @param {String} medida5
		 * @param {String} medida6
		 * 
		 */
		 checkEspacios: {
			rest: {
				method: "GET",
				path: "/check"
			},
			params: {
				medida1: "string",
				medida2: "string",
				medida3: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const medidasUsuario =[ parseInt(ctx.params.medida1), parseInt(ctx.params.medida2), parseInt(ctx.params.medida3)];
				const medidasCont=[ctx.params.medida4,ctx.params.medida5,ctx.params.medida6];
				medidasUsuario.sort(function(a, b){return b - a});
				medidasCont.sort(function(a, b){return b - a});
				if (medidasUsuario[0]<=medidasCont[0] && medidasUsuario[1]<=medidasCont[1] && medidasUsuario[2]<=medidasCont[2])
					return true;
				else
					return false
			}
		},

        /**
		 * Obtener las opciones que tiene un cliente para hacer envío de su paquete
		 *
		 * @param {String} medida1
		 * @param {String} medida2
		 * @param {String} medida3
		 * @param {String} peso
		 * @param {String} salida
		 * @param {String} destino
		 * 
		 */
		 obtenerOpciones: {
			rest: {
				method: "GET",
				path: "/consulta"
			},
			params: {
				medida1: "string",
				medida2: "string",
				medida3: "string",
				peso: "string",
				salida: "string",
				destino: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const disp = await ctx.call("greeter.test1")
				const resp=[]
				for (let i = 0; i< disp.length;i++){
					if(ctx.params.salida==disp[i].pais_A && ctx.params.destino==disp[i].pais_B){
						const cabe = await ctx.call("consultas.checkEspacios",{medida1:ctx.params.medida1,medida2:ctx.params.medida2,medida3:ctx.params.medida3,medida4:disp[i].espacios[0],medida5:disp[i].espacios[1],medida6:disp[i].espacios[2]})
						const medidasUsuario =[ parseInt(ctx.params.medida1), parseInt(ctx.params.medida2), parseInt(ctx.params.medida3)];
						if(parseInt(ctx.params.peso)<=disp[i].peso_maximo && cabe){
							resp.push(disp[i]);			
						}
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


