document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        defaultDate: new Date(2020, 8, 1),
        plugins: ['dayGrid', 'interaction', 'timeGrid', 'list'],
        header: {
            left: 'prev,next today Miboton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        customButtons: {
            Miboton: {
                text: "Botón",
                click: function() {
                    alert("!Hola Mundo¡");
                    $('#exampleModal').modal('toggle');
                }
            }
        },
        dateClick: function(info) {
            limpiarFormulario();
            $('#txtFecha').val(info.dateStr);
            $("#btnAgregar").prop("disabled", false);
            $("#btnModificar").prop("disabled", true);
            $("#btnEliminar").prop("disabled", true);
            $('#exampleModal').modal();
        },
        eventClick: function(info) {
            $("#btnAgregar").prop("disabled", true);
            $("#btnModificar").prop("disabled", false);
            $("#btnEliminar").prop("disabled", false);
            $('#txtID').val(info.event.id);
            $('#txtTitulo').val(info.event.title);
            mes = (info.event.start.getMonth() + 1);
            dia = (info.event.start.getDay());
            anio = (info.event.start.getFullYear());
            mes = (mes < 10) ? "0" + mes : mes;
            dia = (dia < 10) ? "0" + dia : dia;
            minutos = info.event.start.getMinutes();
            hora = info.event.start.getHours();
            minutos = (minutos < 10) ? "0" + minutos : minutos;
            hora = (hora < 10) ? "0" + hora : hora;
            horario = (hora + ":" + minutos);
            $('#txtFecha').val(anio + "-" + mes + "-" + dia);
            $('#txtHora').val(horario);
            $('#txtColor').val(info.event.backgroundColor);
            $('#txtDescripcion').val(info.event.extendedProps.descripcion);
            $('#exampleModal').modal();
        },
        events: url_show

    });
    calendar.setOption('locale', 'Es');
    calendar.render();

    $('#btnAgregar').click(function() {
        objEvento = recolectarDatosGUI("POST");
        EnviarInformacion('', objEvento);
    });

    $('#btnEliminar').click(function() {
        objEvento = recolectarDatosGUI("DELETE");
        EnviarInformacion('/' + $('#txtID').val(), objEvento);
    });

    $('#btnModificar').click(function() {
        objEvento = recolectarDatosGUI("PATCH");
        EnviarInformacion('/' + $('#txtID').val(), objEvento);
    });

    function recolectarDatosGUI(method) {
        nuevoEvento = {
            id: $('#txtID').val(),
            title: $('#txtTitulo').val(),
            descripcion: $('#txtDescripcion').val(),
            color: $('#txtColor').val(),
            textColor: '#FFFFFF',
            start: $('#txtFecha').val() + " " + $('#txtHora').val(),
            end: $('#txtFecha').val() + " " + $('#txtHora').val(),

            '_token': $("meta[name='csrf-token']").attr("content"),
            '_method': method
        }
        return (nuevoEvento);
    }

    function EnviarInformacion(accion, objEvento) {
        $.ajax({
            type: "POST",
            url: url_ + accion,
            data: objEvento,
            success: function(msg) {
                $('#exampleModal').modal('toggle');
                calendar.refetchEvents();
            },
            error: function() { alert("Hay un error"); }
        });
    }

    function limpiarFormulario() {
        $('#txtID').val("");
        $('#txtTitulo').val("");
        $('#txtFecha').val("");
        $('#txtHora').val("07:00");
        $('#txtColor').val("");
        $('#txtDescripcion').val("");
    }
});