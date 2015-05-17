$(document).ready(function(e) {
  	$("#add").on("click",function(){
		//validando
		if($("#tituloTxt").val().length>3){
			if($("#detalleTxt").val().length>3){
				if($("#categoriaCbo").val()!=0){
					if($("#departamentoCbo").val()!=0){
						if($("#correoTxt").val().length>3){
							enviarFormulario();
						}else{
							error($("#correoTxt"));	
						}
					}else{
						error($("#departamentoCbo"));	
					}
				}else{
					error($("#categoriaCbo"));	
				}
			}else{
				error($("#detalleTxt"));	
			}	
		}else{
			error($("#tituloTxt"));	
		}
	
	});///click add
	var error=function(_obj){
		alert("Ingrese todos los datos correctamente");
		_obj.focus();
	}
	var enviarFormulario=function(){
		var datos={
			titulo:$("#tituloTxt").val(),
			detalle:$("#detalleTxt").val(),
			categoria:$("#categoriaCbo").val(),
			departamento:$("#departamentoCbo").val(),
			correo:$("#correoTxt").val()
		}
		$.ajax({
            url: 'api/propuesta/agregar/',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                $('#close').trigger("click");
                $( '#frmMain' ).each(function(){
				    this.reset();
				});
            },
            data: datos
        });
	}
});