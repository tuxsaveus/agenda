@extends('layouts.app')

@section('scripts')
<link rel="stylesheet" href="{{ asset('fullcalendar/core/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/daygrid/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/list/main.css') }}">
<link rel="stylesheet" href="{{ asset('fullcalendar/timegrid/main.css') }}">

<script src="{{ asset('fullcalendar/core/main.js') }}" defer></script>
<script src="{{ asset('fullcalendar/interaction/main.js') }}" defer></script>
<script src="{{ asset('fullcalendar/daygrid/main.js') }}" defer></script>
<script src="{{ asset('fullcalendar/list/main.js') }}" defer></script>
<script src="{{ asset('fullcalendar/timegrid/main.js') }}" defer></script>
<script>
    var url_="{{ url('/eventos') }}";
    var url_show="{{ url('/eventos/show') }}";
</script>
<script src="{{ asset('js/main.js') }}" defer></script>

@endsection
@section('content')
<div class="row">
    <div class="col"></div>
    <div class="col-8"><div id="calendar"></div></div>
    <div class="col"></div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Datos del Evento</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
            </div>
            <div class="modal-body">
                <div class="d-none">
                    ID:
                    <input type="text" name="txtID" id="txtID">
                    <br/>
                    Fecha:
                    <input type="text" name="txtFecha" id="txtFecha">
                    <br/>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-8">
                        <label>Titulo:</label>
                        <input type="text" class="form-control" name="txtTitulo" id="txtTitulo">
                    </div>

                    <div class="form-group col-md-4">
                        <label>Hora:</label>
                        <input type="time" min="07:00" max="19:00" step="600" class="form-control" name="txtHora" id="txtHora">
                    </div>

                    <div class="form-group col-md-12">
                        <label>Descripcion:</label>
                        <textarea class="form-control" name="txtDescripcion" id="txtDescripcion" cols="30" rows="3"></textarea>
                    </div>

                    <div class="form-group col-md-12">
                        <label>Color:</label>
                        <input type="color" class="form-control" name="txtColor" id="txtColor">
                    </div>

                </div>

            </div>
            <div class="modal-footer">

                <button id="btnAgregar" class="btn btn-success">Agregar</button>
                <button id="btnModificar" class="btn btn-warning">Modificar</button>
                <button id="btnEliminar" class="btn btn-danger">Eliminar</button>
                <button id="btnCancelar" data-dismiss="modal" class="btn btn-default">Cancelar</button>

            </div>
        </div>
    </div>
</div>
@endsection
