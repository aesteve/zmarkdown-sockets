package fr.zestedesavoir.server

import org.vertx.groovy.core.http.HttpServer
import org.vertx.groovy.core.http.HttpServerRequest
import org.vertx.groovy.core.http.ServerWebSocket
import org.vertx.groovy.platform.Verticle

import fr.zestedesavoir.parsing.ZMarkdownParser

class SocketServer extends Verticle {

	HttpServer httpServer
	ZMarkdownParser zMarkdownParser

	def start() {
		zMarkdownParser = new ZMarkdownParser()
		httpServer = vertx.createHttpServer()
		httpServer.websocketHandler { ServerWebSocket sock ->
			sock.dataHandler { buffer ->
				String txtReceived = buffer.toString() // FIXME toBe(productionReady) : The PoC doesn't handle splitted messages 
				sock.writeTextFrame(zMarkdownParser.parseText(txtReceived))
			}
			sock.endHandler { 
				println "closed" 
			}
		}
		// FIXME toBe(productionReady) : serve resources like CSS / JS / ... locally => route paths
		httpServer.requestHandler { HttpServerRequest request ->
			if (request.path == "/")
				request.response.sendFile("assets/index.html")
			else
				request.response.sendFile("assets${request.path}")
		}
		httpServer.listen(container.config.port)
	}
}
