$(document).ready(start);


function start () {
	$(".escondido").hide();
	$("#materiales").on("click",muestraMaterial)
	$("#mate").on("click",mate)
}

function muestraMaterial() {
	$("#contenedorMateriales").show();
	$("#cerrarTodo").on("click",()=>{
		$("#contenedorMateriales").hide();
	});
	$("#mostrarLeerMaterial").on("click",muestraMateriales)
	$("#mostrarRegistroMaterial").on("click",()=>{
		$("#registroMaterial").show();
		$("#enviarMaterial").on("click",enviar);
		$("#cerrar").on("click",()=>{
			$("#registroMaterial").hide();

		})
	})
}

function enviar(){
	$.ajax({
		type: 'POST',
		url: 'php/crearMaterial.php',
		data: {
			nombre: $("#nombre").val(),
			marca: $("#marca").val(),
			cantidad : $("#cantidad").val()
		},
		success: (data)=>{
			console.log(data);
			$("#nombre").val("");
			$("#marca").val("");
			$("#cantidad").val("");
			$("#registroMaterial").hide();

		}
	})
}
function muestraMateriales(){
	var html ;
	$.ajax({
		type:'POST',
		url: 'php/obtenMateriales.php',
		success : (data)=>{
			if(data==""){
				html = `<td colspan=4>
							No hay registros
						</td>`;
			}else{
				data = JSON.parse(data);
				for(let dato of data){
					html += `
						<tr>
							<td>${dato.nombre_producto}</td>
							<td>${dato.marca_producto}</td>
							<td>${dato.cantidad}</td>
							<td>
								<button class="btn btn-primary editar" data-id=${dato.id_producto}>editar</button>
								<button class="btn btn-danger eliminar" data-id=${dato.id_producto}>Eliminar</button>
							</td>
						</tr>
					`;
				}
				console.log(html);
			}
			$("#respuesta").html(html);
			$(".eliminar").on("click",eliminarMaterial)
			$(".editar").on("click",editarMaterial)
		}
	})
	$("#res").show();
}

function eliminarMaterial() {
	$(this).data("id");
	$.ajax({
		type: 'POST',
		url: 'php/eliminarMaterial.php',
		data: {
			_id : $(this).data("id")
		},
		success: (data)=>{
			alert(data);
			muestraMateriales();
		}
	})
}

function editarMaterial() {
	var id = $(this).data("id");
	$.ajax({
		type : 'GET',
		url : 'php/obtenerMaterial.php',
		data : {
			_id : id 
		},
		success : (data)=>{
			data = JSON.parse(data);
			console.log(data)
			$("#formularioEditar").html(`
				<input type="text" class="form-control" value=${data[0].nombre_producto} id='otroNombre' />
				<input type="text" class="form-control my-3" value="${data[0].marca_producto}" id='otraMarca' />
				<input type="text" class="form-control" value=${data[0].cantidad} id='otraCantidad' />
				<button class="btn btn-primary" id='enviar'>Guardar</button>
			`);
			$("#enviar").on("click",()=>{
				enviarEditar(id)
			});
		}
	})
}

function enviarEditar(_id) {
	alert(_id)
	$.ajax({
		type: 'POST',
		url: 'php/editarMaterial.php',
		data : {
			_id : _id,
			nombre : $("#otroNombre").val(),
			marca : $("#otraMarca").val(),
			cantidad : $("#otraCantidad").val()
		},
		success: (data)=>{
			alert(data);
			$("#formularioEditar").hide();
			$("#formularioEditar").html("");
			muestraMateriales();
		}
	})
}

function mate() {
	$("#contenedorLleva").show();
	$("#sacar").on("click",enviarLleva)
	$("#llevarr").on("click",muestreForm)
	$("#todos").on("click",muestraPrestamos)
}

function muestreForm() {
	var html
	$.ajax({
		type:'POST',
		url: 'php/obtenMateriales.php',
		success : (data)=>{
			data = JSON.parse(data)
			for(let dato of data){
				html += 
				`
					<option value="${dato.id_producto}">${dato.nombre_producto}</option>	
				`
			}
			$("#materia").html(html);
		}
	})
	$("#formularioLleva").show();
}

function enviarLleva(e) {
	e.preventDefault();
	var materia = $("#materia").val();
	var cant = $("#sac").val();
	$.ajax({
		type: 'POST',
		url: 'php/crearPrestamo.php',
		data : {
			producto : materia,
			cant : cant
		},
		success : (data)=>{
			alert(data);
			$("#sac").val("");
		}
	})
}

function muestraPrestamos() {
	var html;
	$.ajax({
		type : 'POST',
		url:'php/obtenerPrestamos.php',
		success : (data)=>{
			data = JSON.parse(data);
			for(let dato of data){
				html += `
					<tr>
						<td>${dato.producto_lleva}</td>
						<td>${dato.cantidad}</td>
						<td>
							<button data-id="${dato.id_lleva}" class="btn btn-primary Editar2">Editar</button>
							<button data-id="${dato.id_lleva}" class="btn btn-danger Eliminar2">Eliminar</button>
						</td>
					</tr>
				`
			}
			$("#reeee").html(html);
			$(".Eliminar2").on("click",eliminarPres);
			$(".Editar2").on("click",editarLle)
		}
	})
	$("#prestamos").show();
}

function eliminarPres() {
	var _id =  $(this).data("id");
	$.ajax({
		type : 'POST',
		url : 'php/eliminarPres.php',
		data : {
			_id : $(this).data("id")
		},
		success: (data)=>{
			alert(data);
			muestraPrestamos();
		}
	})
}

function editarLle() {
	var _id = $(this).data("id");
	var html;
	$.ajax({
		type:'POST',
		url: 'php/obtenMateriales.php',
		success : (data)=>{
			data = JSON.parse(data)
			for(let dato of data){
				html += 
				`
					<option value="${dato.id_producto}">${dato.nombre_producto}</option>	
				`;
			}
			$("#press").html(html);
		}
	})
	$.ajax({
		type : 'POST',
		url : 'php/obtenerLleva.php',
		data : {
			_id:$(this).data("id")
		},
		success : (data)=>{
			$("#nuevaCanttt").remove();
			data = JSON.parse(data)[0];
			$("#press").after(`
				<input class="form-control my-3" type="text" value="${data.cantidad}" id="nuevaCanttt" />
			`)
		}
	});
	$("#formlle").show();
	$("#terminar").on("click",()=>{termine(_id)});
}

function termine(id) {
	$.ajax({
		type : 'POST',
		url : 'php/editLleva.php',
		data : {
			_id : id,
			cant : $("#nuevaCanttt").val(),
			mat : $("#press").val()
		},
		success : (data)=>{
			alert(data);
			$("#formlle").hide();
			muestraPrestamos();
		}
	})
}

