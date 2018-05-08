require 'sinatra'
require 'sequel'
require 'sqlite3'

# conexión a base de datos
Sequel::Model.plugin :json_serializer
DB = Sequel.connect('sqlite://demo.db')

# clases ORM
class Departamento < Sequel::Model(DB[:departamentos])
end

class Provincia < Sequel::Model(DB[:provincias])
end

class Distrito < Sequel::Model(DB[:distritos])
end

class DistritoProvinciaDepartamento < Sequel::Model(DB[:vw_distrito_provincia_departamentos])
end

# aplicación sinatra
before do
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
  headers['Content-type'] = 'text/html; charset=UTF-8'
  headers['server'] = 'Ruby, Ubuntu'
end

get '/test/conexion' do
  'Ok'
end

get '/' do
  'Error: Url Vacía'
end

# rutas : departamento
get '/departamento/listar' do
  Departamento.all.to_a.to_json
end

post '/departamento/guardar' do
  data = JSON.parse(params[:data])
  nuevos = data['nuevos']
  editados = data['editados']
  eliminados = data['eliminados']
  rpta = []
  array_nuevos = []
  error = false
  execption = nil
  DB.transaction do
    begin
      if nuevos.length != 0
        nuevos.each do |nuevo|
          n = Departamento.new(
            :nombre => nuevo['nombre']
          )
          n.save
          t = {
            :temporal => nuevo['id'],
            :nuevo_id => n.id
          }
          array_nuevos.push(t)
        end
      end
      if editados.length != 0
        editados.each do |editado|
          e = Departamento.where(
            :id => editado['id']
          ).first
          e.nombre = editado['nombre']
          e.save
        end
      end
      if eliminados.length != 0
        eliminados.each do |eliminado|
          Departamento.where(
            :id => eliminado
          ).delete
        end
      end
    rescue Exception => e
      Sequel::Rollback
      error = true
      execption = e
    end
  end
  if error == false
    return {
      :tipo_mensaje => 'success',
      :mensaje => [
        'Se ha registrado los cambios en los departamentos',
        array_nuevos
        ]
      }.to_json
  else
    status 500
    return {
      :tipo_mensaje => 'error',
      :mensaje => [
        'Se ha producido un error en guardar la tabla de departamentos',
        execption.message
        ]
      }.to_json
  end
end

# rutas : distrito
get '/distrito/buscar' do
  DistritoProvinciaDepartamento.where(Sequel.like(:nombre, params['nombre'] + '%')).limit(10).to_a.to_json
end
