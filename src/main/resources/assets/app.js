$(document).ready(function(){
	var preview = $('#markdown-preview');
	var editor = $('#markdown-editor');
	var status = $('#ws-status');
	var container = $(".content-container");
	var ignoreScroll = false;
	
	
	/* Utils */
	var debounce = function(func, wait, immediate) { // as picked-up from underscorejs
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	var cleanStatus = function(){
		status.removeClass("success error warning");
	};
	
	/* Sockets */
	var sock  = new WebSocket("ws://localhost:8000");
	
	sock.onopen = function(){
		cleanStatus();
		status.html("Connected");
		status.addClass("success");
	};
	
	sock.onmessage = function(message){
		cleanStatus();
		status.html("...Preview up-to-date");
		preview.html(message.data);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		status.addClass("success");
		adaptPreviewScroll();
	};
	
	sock.onclose = function(){
		cleanStatus();
		status.html("Offline");
		status.addClass("error");
	};
	
	/* Bindings */
	
	var renderPreview = function(){
		cleanStatus();
		status.html("Preview in progress...");
		status.addClass("warning");
		sock.send(editor.val());
	};
	
	
	var debouncedPreview = debounce(renderPreview, 250);
	
	editor.on("keyup", debouncedPreview);
	
	var adaptPreviewScroll = function(){
		if(ignoreScroll)
			return
		var scrollRatio = editor.scrollTop()/editor[0].scrollHeight;
		var scrollInPreview = Math.round(scrollRatio * preview[0].scrollHeight);
		ignoreScroll = true;
		container.scrollTop(scrollInPreview);
		ignoreScroll = false;
	};
	
	var adaptEditorScroll = function(){
		if (ignoreScroll)
			return
		var scrollRatio = container.scrollTop()/container[0].scrollHeight;
		var scrollInEditor = Math.round(scrollRatio * editor[0].scrollHeight);
		ignoreScroll = true;
		editor.scrollTop(scrollInEditor);
		ignoreScroll = false;
	}
	
	editor.on("scroll", adaptPreviewScroll);
	//container.on("scroll", adaptEditorScroll);
	
});
