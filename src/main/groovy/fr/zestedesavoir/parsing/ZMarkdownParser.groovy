package fr.zestedesavoir.parsing

import org.python.core.PyString
import org.python.util.PythonInterpreter

class ZMarkdownParser {
	
	private PythonInterpreter interp
	private final static String zdsExtension = "ZdsExtension({'inline': False, 'emoticons': smileys})"
	private final static String pythonCmd = "render = Markdown(extensions=(${zdsExtension},),safe_mode = 'escape', enable_attributes = False, tab_length = 4, output_format = 'html5', smart_emphasis = True, lazy_ol = True).convert(text)"
	
	public ZMarkdownParser(){
		interp = new PythonInterpreter()
		interp.exec("from markdown import Markdown")
		interp.exec("from markdown.extensions.zds import ZdsExtension")
		interp.exec("from smileys_definition import smileys")
	}
	
	def parseText(String text){
		interp.set("text", text)
		interp.exec(pythonCmd)
		PyString render = interp.get("render", PyString.class)
		render.toString()
	}
}
