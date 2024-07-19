---
title: Componentes
description: Comienza con la compresion de esta parte de la aplicacion, esta documentacion contiene toda la informacion sobre el flujo y proceso del codigo relacionado con la captura de informacion del usuario para generar un Avaluo
hero:
    tagline: Comienza con la compresión de esta parte de la aplicacion, donde explicaremos el funcionamiento de los componentes para Avaluo.
---

## SignaturePad

A continuacion se comparte el codigo del componente de SignaturePad la cual permite al usuario realizar/pintar sobre un lienzo el cual almacena la forma generada cuyo proposito es capturar una Firma.

### Modelo de la Clase
Este componente debe de recibir una clase con la siguiente estructura.
```csharp
    public class UserSignature
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdSignatureCatalogo { get; set; }
        public string UserSignatureBase64 { get; set; }
    }
```

Los atributos de la clase mostrados son obligatorios para su funcionamiento, ya que esto por medio de ```ASP TAG HELPERS``` en .NET nos permitira vincular la informacion a la clase una vez se envie esta informacion al controlador(Controller).

### Datos recibidos adicionalmente 
Esta informacion se recibe de la vista padre a traves de donde se esta renderizando este ```Partial View```
```csharp
//_SignaturePad.cshtml
@{
    var index = ViewData["Index"];
}
```
Ejemplo de como se reciben los datos de la vista padre
```csharp
//archivo-padre.cs
 @for (int i = 0; i < Model.Signatures.Count; i++)
 {
     var viewData = new ViewDataDictionary(ViewData) { { "Index", i } };

     <div class="accordion-item">

         <h2 class="accordion-header">
             <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-@Model.Signatures[i].Nombre" aria-expanded="false" aria-controls="flush-collapse-@Model.Signatures[i].Nombre">
                 FIRMA @Model.Signatures[i].Nombre
             </button>
         </h2>
         <div id="flush-collapse-@Model.Signatures[i].Nombre" class="accordion-collapse collapse" data-bs-parent="#accordionFlushSignatures">
             <div class="accordion-body">
                 @Html.Partial("_SignaturePad", new UserSignature
        {
            Id = Model.Signatures[i].Id,
            Nombre = Model.Signatures[i].Nombre,
            IdSignatureCatalogo = Model.Signatures[i].IdSignatureCatalogo,
            UserSignatureBase64 = Model.Signatures[i].UserSignatureBase64
        }, viewData)
             </div>

         </div>

     </div>
 }
```


### HTML

Como se podra observar a continuacion estamos haciendo uso de un ```canvas``` el cual nos permite generar un lienzo sobre el cual el usuario podra realizar la accion para insertar su firma, este canvas contiene un id ```signatureCanvas_@index``` esto nos permite asociar cada canvas generado sobre la vista con sus respectivas funciones, ya que si no se coloca el ```@index``` esta informacion se va a corromper debido a que no se podra asociar la ejecucion de ciertas funciones y el pintar la firma sobre el canvas correcto.
```csharp
//_SignaturePad.cshtml
<div class="d-flex flex-column gap-2 align-content-center justify-content-center align-items-center">
    <canvas id="signatureCanvas_@index" width="820" height="300" class="border" style="width: 820px; height: 300px;"></canvas>
    <label asp-for="Nombre" class="fw-bold small">FIRMA @Model.Nombre</label>
    <input type="hidden" name="Signatures[@index].Id" value="@Model.Id" />
    <input type="hidden" name="Signatures[@index].Nombre" value="@Model.Nombre" />
    <input type="hidden" name="Signatures[@index].IdSignatureCatalogo" value="@Model.IdSignatureCatalogo" />
    <input id="UserSignatureBase64_@index" type="hidden" name="Signatures[@index].UserSignatureBase64" value="@Model.UserSignatureBase64" />
    <button type="button" id="resetCanvasBtn_@index" class="btn btn-warning btn-sm mt-2">Resetear</button>
</div>
```

Todos los demas campos de tipo ```input``` son para asociar la informacion y vincularla una vez se realice el envio de los datos capturados en el formulario al controlador (Controller).
:::caution
Es necesario respetar la estructura que contienen los ```inputs``` ya que esto permite vincular los datos con sus correspondientes clases una vez esta informacion llega al controlador, de lo contrario no se capturaran los datos.
```csharp
//_SignaturePad.cshtml
name="Signatures[@index].IdSignatureCatalogo" value="@Model.IdSignatureCatalogo"
```
Como podra observar se inicia por name cuyo prefijo inicia por el nombre del atributo de la clase padre ```Signatures``` seguido por el ```[@index]``` que es el indice que pertenece al valor numero del for que se ejecuta en la vista principal, esto seguido del nombre del atributo de la clase ```IdSignatureCatalogo``` a vincular. Y simplemente le asignamos como value el valor que viene del objeto ```value="@Model.IdSignatureCatalogo"```
:::


### Codigo de JavaScript
```csharp
//_SignaturePad.cshtml
    document.addEventListener("DOMContentLoaded", function () {
        var canvas = document.getElementById('signatureCanvas_@index');
        var ctx = canvas.getContext('2d');
        var isDrawing = false;
        var lastX = 0;
        var lastY = 0;

        function draw(e) {
            if (!isDrawing) return;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            lastX = e.offsetX;
            lastY = e.offsetY;
        }

        canvas.addEventListener('mousedown', function (e) {
            isDrawing = true;
            lastX = e.offsetX;
            lastY = e.offsetY;
        });

        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', function () {
            isDrawing = false;
            var dataURL = canvas.toDataURL('image/png');
            document.getElementById('UserSignatureBase64_@index').value = dataURL;
        });
        canvas.addEventListener('mouseout', function () {
            isDrawing = false;
        });

        // Cargar la firma en el canvas si existe
        var signatureBase64 = document.getElementById('UserSignatureBase64_@index').value;
        if (signatureBase64) {
            loadSignature(signatureBase64, ctx);
        }

        // Funcionalidad para el botón de resetear
        var resetBtn = document.getElementById('resetCanvasBtn_@index');
        resetBtn.addEventListener('click', function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('UserSignatureBase64_@index').value = '';
        });
    });

    function loadSignature(base64Image, ctx) {
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
        img.src = "data:image/png;base64," + base64Image;
    }
```

## DiagramVehicle
Este componente permite al usuario realizar la insercion de cierto tipo de `Afectaciónes` en el Vehículo como pueden ser `GOLPE`, `RAYADURAS` O `RAYADURAS_GRAVES` hasta el momento en el que se escribe esta documentación. Cada vez que el usuario inserta una afectación esta sera representada a traves de un `canvas` con la forma de una figura y color. El canvas representa el diagrama de un vehículo y el usuario asigna la afectación en una zona especifica del vehículo.

Ejemplo de como se inserta la `Partial View` en el padre:
```csharp
//archivo-padre.cshtml
@Html.Partial("_DiagramVehicle", Model.VehiculoCoordenadas)
```

### Modelo de la Clase

Este componente debe de recibir una clase con la siguiente estructura, el atríbuto de `SerializedCoordenadas` sirve para almacenar las coordenadas en formato `json` cuando se realiza el envio de la información desde el formulario hacia el controlador. Este string posteriormente en el controlador es deserializado en la clase de `CoordenadasViewModel`.

```csharp
 public class VehiculoCoordenadasViewModel
    {
        public List<CoordenadasViewModel> Coordenadas { get; set; } = new List<CoordenadasViewModel>();
        public string SerializedCoordenadas { get; set; }
    }
```

Esta es la clase de CoordenadasViewModel, como podemos observar en la estructura cuenta con `X` e `Y` cuyo proposito es almacenar las coordenadas que se insertaron en el `canvas` esto nos permite volver a renderizar las mismas coordenadas en el mismo lugar una vez se vuelve a visualizar, cada Coordenada cuenta con el Type, este atributo hace referencia a un `enum` que hasta la fecha de escrita esta documentación cuenta con tres valores.
El `Id` y el `IdInspeccion`, son necesarios ya que esto nos permite evaluar si esta Coordenada es nueva o si ya existia debido a que fue anteriormente almacenada en la Base de Datos.

```csharp
//CoordenadasViewModel.cs
  public class CoordenadasViewModel
    {
        public int Id { get; set; }
        public int IdInspeccion { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public AfectacionViewModel Type { get; set; }
        ...
    }
```

El `enum` de `AfectacionViewModel` contiene la siguiente estructura: 
```csharp
//AfectacionViewModel.cs
    public enum AfectacionViewModel
    {
        GOLPE = 1,
        RAYADURA = 2,
        RAYADURAS_GRAVES = 3
    }
```

### HTML

Como podra observar a continuación utilizamos el `canvas`, dicha etiqueta de html contiene un `style="background-image: url('https://cdn.pinkertone.com.mx/esquema.avif'); background-size: cover;"` que representa el diagrama del vehículo, otra cosa a notar es el tamaño es de `500x500` esto quiere decir que cuenta con un `aspect-ratio 1x1` y esto nos permite reedimensionar el tamaño del canvas sin afectar la ubicacion de las coordenadas ya que por medio de un proceso matematíco podemos reacomodar las coordenadas de acuerdo a la nueva resolucion siempre y cuando se respete el `aspect-ratio 1x1`

```csharp
//_DiagramVehicle.cshtml
<div class="d-flex flex-column">
    <div>
        <canvas id="vehicleCanvas" class="border" width="500" height="500" style="background-image: url('https://cdn.pinkertone.com.mx/esquema.avif'); background-size: cover;"></canvas>
    </div>
    <div>
        <input id="inspectionData" name="VehiculoCoordenadas.SerializedCoordenadas" value="@Model.SerializedCoordenadas" type="hidden" />
    </div>
    <div class="mt-3">
        <button type="button" class="btn btn-primary btn-small" onclick="setInspectionType('RAYADURA')">RAYADURA</button>
        <button type="button" class="btn btn-danger btn-small" onclick="setInspectionType('GOLPE')">Golpe</button>
        <button type="button" class="btn btn-warning btn-small" onclick="setInspectionType('RAYADURAS_GRAVES')">RAYADURAS GRAVES</button>
        <button type="button" class="btn btn-secondary btn-small" onclick="undoLastAction()">Deshacer</button>
    </div>
</div>
```

### Código de JavaScript

#### Variables

- `inspectionData` es donde inyectamos las coordenadas que vienen desde el servidor si es que estas ya son existentes y a traves de varias funciones y metodos en JavaScript es que formateamos esos datos para insertarlos en el `canvas`.
- 
- `originalCanvasSize` es donde asignamos el valor original del `canvas` esto nos permite redimensionarlo despues.
  
#### Funciones

- `toPascalCase` Convertimos las propiedades de cada objeto (Coordenada) a PascalCase es decir si el objeto originalmente viene con la siguiente estructura: 
```js
{
    x: 0,
    y: 0,
    type: 1,
}
```
Este pasa a ser: 
```js
{
    X: 0,
    Y: 0,
    Type: 1
}
```
- `convertTypeToText` Convertir el `type` de numérico a texto
- `convertTypeToNumber` Convertir el `type` de texto a numérico
- `prepareDataForController` Prepara los datos antes de enviar al controlador
- `drawOnCanvas` Dibujar en el canvas
- `redrawCanvas` Redibujar el canvas con las coordenadas actuales
- `undoLastAction` Deshacer la última acción (eliminar última coordenada)
- `setInspectionType` Establece el tipo de afectación
- `resizeCanvas` Redimensiona el tamaño del canvas


```csharp "inspectionData"
//_DiagramVehicle.cshtml
const originalCanvasSize = 1000;
    let inspectionType = 'GOLPE'; // Asegúrate de que coincida con los valores del enum en el backend
    let inspectionData = @Html.Raw(Json.Serialize(Model.Coordenadas));
    let canvasSize = 500;
    let canvas = null;
    let ctx = null;

    // Mapa de tipos de inspección para facilitar la conversión
    const inspectionTypeMap = {
        1: 'GOLPE',
        2: 'RAYADURA',
        3: 'RAYADURAS_GRAVES'
    };

    // Función para convertir las propiedades a PascalCase
    function toPascalCase(obj) {
        const pascalCaseObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
                pascalCaseObj[pascalKey] = obj[key];
            }
        }
        return pascalCaseObj;
    }

    // Función para convertir el tipo numérico a texto
    function convertTypeToText(data) {
        if (data.Type === 1) {
            data.Type = "GOLPE";
        } else if (data.Type === 2) {
            data.Type = "RAYADURA";
        } else if (data.Type === 3) {
            data.Type = "RAYADURAS_GRAVES";
        }
        return data;
    }

    // Función para convertir el tipo texto a numérico
    function convertTypeToNumber(data) {


        const reverseTypeMap = Object.fromEntries(Object.entries(inspectionTypeMap).map(([k, v]) => [v, k]));
        if (data.Type == "GOLPE") {
            data.Type = 1
        }

        if (data.Type == "RAYADURA") {
            data.Type = 2
        }

        if (data.Type == "RAYADURAS_GRAVES") {
            data.Type = 3
        }
        return data;
    }

    // Función para preparar los datos antes de enviar al controlador
    function prepareDataForController(data) {
        return data.map(item => {
            if (item.Type === 0) {
                item.Type = inspectionTypeMap[1]; // Suponiendo que todos los existentes en el servidor son del tipo 1 (GOLPE)
            } else {
                item.Type = inspectionTypeMap[item.Type] || 'UNKNOWN'; // Convertir tipos nuevos según el mapa
            }
            return item;
        });
    }

    // Función para dibujar en el canvas
    function drawOnCanvas(data) {
        const scale = canvasSize / originalCanvasSize;
        const x = data.X * scale;
        const y = data.Y * scale;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        if (data.Estatus == false || data.Estatus == undefined || data.Estatus == null) {
            if (data.Type === 'GOLPE') {
                ctx.strokeStyle = 'red';
                ctx.beginPath();
                ctx.arc(x, y, 10 * scale, 0, Math.PI * 2);
                ctx.stroke();
            } else if (data.Type === 'RAYADURA') {
                ctx.strokeStyle = 'blue';
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 10 * scale, y);
                ctx.stroke();
            } else if (data.Type === 'RAYADURAS_GRAVES') {
                ctx.strokeStyle = 'green';
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 20 * scale, y);
                ctx.stroke();
                ctx.moveTo(x, y + 5 * scale);
                ctx.lineTo(x + 20 * scale, y + 5 * scale);
                ctx.stroke();
            } else {
                // Dibujar una "X" para cualquier otro tipo
                ctx.strokeStyle = 'purple';
                ctx.beginPath();
                ctx.moveTo(x - 10 * scale, y - 10 * scale);
                ctx.lineTo(x + 10 * scale, y + 10 * scale);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x + 10 * scale, y - 10 * scale);
                ctx.lineTo(x - 10 * scale, y + 10 * scale);
                ctx.stroke();
            }
        }
    }

    // Función para redibujar el canvas con las coordenadas actuales
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        inspectionData.forEach(item => drawOnCanvas(convertTypeToText(toPascalCase(item))));
    }

    // Función para deshacer la última acción (eliminar última coordenada)
    function undoLastAction() {
        if (inspectionData.length > 0) {
            let coordenadaDeleted = inspectionData.pop(); // Elimina la última coordenada del array
            coordenadaDeleted.Estatus = true;
            inspectionData.unshift(coordenadaDeleted);
            redrawCanvas(); // Redibuja el canvas sin la última coordenada eliminada
            document.getElementById('inspectionData').value = JSON.stringify(prepareDataForController(inspectionData.map(item => convertTypeToNumber(toPascalCase(item)))));
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        canvas = document.getElementById('vehicleCanvas');
        ctx = canvas.getContext('2d');

        // Dibujar los datos guardados en el canvas
        inspectionData.forEach(item => drawOnCanvas(convertTypeToText(toPascalCase(item))));

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) * (originalCanvasSize / canvasSize);
            const y = (event.clientY - rect.top) * (originalCanvasSize / canvasSize);
            const estatus = false;
            const id = 0;

            const newInspection = { X: x, Y: y, Type: inspectionType, Estatus: estatus, Id: id };
            inspectionData.push(toPascalCase(newInspection));
            drawOnCanvas(newInspection);
            document.getElementById('inspectionData').value = JSON.stringify(prepareDataForController(inspectionData.map(item => convertTypeToNumber(toPascalCase(item)))));
        });

        // Mueve el código aquí para asegurar que el canvas ya está dibujado
        document.getElementById('inspectionData').value = JSON.stringify(prepareDataForController(inspectionData.map(item => convertTypeToNumber(toPascalCase(item)))));

    });

    function setInspectionType(type) {
        inspectionType = type.toUpperCase();
        document.getElementById('selectedType').innerText = type;
    }

    function resizeCanvas(size) {
        canvasSize = size;
        canvas.width = size;
        canvas.height = size;
        document.querySelector('.canvas-container').style.width = size + 'px';
        document.querySelector('.canvas-container').style.height = size + 'px';
        document.getElementById('canvasSize').innerText = size;
        redrawCanvas();
    }
```