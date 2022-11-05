var canvas=document.getElementById("miCanvas");
var ctx=canvas.getContext("2d");
var imagen=new Image();
var anchodeljuego=canvas.width;
var largodeljuego=canvas.height;
//variables que me permiten conocer la posicion de la ave
var posicionXdelave=canvas.width/2;
var posicionYdelave=canvas.height/2;

var gravedad=8;


var largodelave=50;
var anchodelave=35;
var largopixelesdelave=20;
var anchopixelesdelave=15;
//variable que  ayudaran a saber las posiciones de las distintas aves
var Skinaves= [ [113,327], [113,354], [85,489], //aves azules [0][0,1,2]
                [113,406], [113,431], [113,379],   //aves rojas
                [31,490],  [57,490], [2,490]       //aves amarillas
                ];
var avepos = 0;
//variables para los dos dintintos escenarios
var largodelescenario = canvas.width;
var anchodelesenario = canvas.height-100;
var escenarios = [[0,0], [146,0]];
//var pipesarriba = [[56,322];
//var pipesabajo =  [[83,322]];
//llamado a la imagen donde estan los materiales a usar
var posicionXdelobstaculo = canvas.width;
var pos1= posicionXdelobstaculo-100;
var pos2= posicionXdelobstaculo - (150 * 2);
var pos3 = posicionXdelobstaculo-(150*3);
var pos4 = posicionXdelobstaculo-(150*4);
var separacionEntreObstaculos = 150;
var separacion = 120;
var iniciodereaparicion = -100;
//primero haremos que aparezca el background
var pausa = true;
var  estadodelJuego = false;
//ajustes del teclado
var teclaprecionada = 0;
imagen.src ="imagenes/flappybirdimage.png";
//marcador que nos permite llevar el conteo
var marcador=0;
//inicio del juego


function draw()
{
    dibujarBackGround();
    dibujarObstaculos();
    dibujarAve();
    dibujarMarcador();
    //que es la ave este dentro de los juegos
    dibujarPausa();
    if(pausa !=false)
    {
    if(posicionYdelave<=largodelescenario+60 && posicionYdelave>=0)
    {
      animacionDevolar();
      detectarColision();
      aumentarmarcador();
      recorrido_de_los_pipes();
      posicionYdelave = posicionYdelave + gravedad; //me permite  que el ave se mantenga bajando para asi poder detectar las caidas
  }else {
    document.removeEventListener('keyup', detectarSalto,false);
    pantalladederrota();
    setTimeout(recargarpagina2,2000);
  }
  }
}

function recorrido_de_los_pipes()
{
  if(pos1<0)
  {
      pos1=canvas.width;
      alturadeltubo1partedeabajo = getRandomInt(min,max);
      alturadeltubo1partedearriba = getRandomInt(min,max2);
  }
  if(pos2<0)
  {
      pos2 = canvas.width;
      alturadeltubo2partedeabajo = getRandomInt(min,max)
      alturadeltubo2partedearriba = getRandomInt(min,max2);
  }
  if(posicionXdelobstaculo<0)
  {
      posicionXdelobstaculo = canvas.width;
  }

  if(posicionXdelobstaculo>-1 || pos1>-1)
  {
      posicionXdelobstaculo= posicionXdelobstaculo-5;
      pos1-=5;
      pos2-=5;
  }
}

document.addEventListener('keyup', detectarSalto,false);

function detectarSalto(e)
{
    //tecla enter es de codigo 13
    //console.log(e.keyCode);
    if(e.keyCode==38)
    {
            posicionYdelave -=(50);
    }
    if(e.keyCode==13)
    {
          estadodelJuego = !estadodelJuego;
    }
    if(e.keyCode==80)
    {
        pausa = !pausa;
    }


}

function dibujarPausa()
{
  //333,141
  //346,141
  //346-333= 13
  //333,156
  //156-141 = 15
  if(pausa!=false)
  {
    ctx.drawImage(imagen,333,141,15,15,canvas.width-40, 10, 30,32);
  }else{
      ctx.drawImage(imagen,120,305,15,15,canvas.width-40, 10, 30,32);
  }
}

//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
function dibujarBackGround()
{
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(imagen,escenarios[0][0],escenarios[0][1],144,256,0,0,largodelescenario,anchodelesenario);

    //esta parte es para dibujar la parte inferior
    ctx.drawImage(imagen,291,0,170,57,0,anchodelesenario,largodelescenario,100);
}

function dibujarAve()
{
    //ctx.clearRect(posicionXdelave, posicionYdelave, largodelave, anchodelave);
    ctx.drawImage(imagen,Skinaves[avepos][0],Skinaves[avepos][1], largopixelesdelave,anchopixelesdelave, posicionXdelave, posicionYdelave, largodelave, anchodelave)
    posicionYdelave = posicionYdelave;
}
//me permite dibujar los dibujarObstaculos

let alturadeltubo2partedeabajo=150;
let alturadeltubo1partedeabajo=100
let alturadeltubo1partedearriba = 100;
let alturadeltubo2partedearriba = 150;
function dibujarObstaculos()
{
    //llamamos a la funcion para tener numeros aleatorios
    //tubos derechos
    ctx.drawImage(imagen, 56,322,27,161,pos1, 0,50,alturadeltubo1partedearriba);
    ctx.drawImage(imagen, 83,322,27,161,pos1, largodelescenario-alturadeltubo1partedeabajo+100,50,alturadeltubo1partedeabajo);
    //tubos izquierdo
    ctx.drawImage(imagen, 56,322,27,161,pos2, 0,50,alturadeltubo2partedearriba);
    ctx.drawImage(imagen, 83,322,27,161,pos2, largodelescenario-alturadeltubo2partedeabajo+100,50,alturadeltubo2partedeabajo);

}
//generar numeros aleatorios entre 2 valores
// Notesé que también en este caso `min` será incluido y `max` excluido
let min = 100;
let max =230;
let max2=210;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


//nos permite permutar entre imagenes de la ave para parecer que vuela
let auxiliardevuelo = avepos+2
function animacionDevolar()
{
    //ctx.clearRect(posicionXdelobstaculo,0,45, 240);
    avepos++;
    if(avepos>=auxiliardevuelo)
    {
        avepos = 0;
    }
}

function animaciondeperder()
{
  while(posicionYdelave<= largodelescenario+60)
  {
    posicionYdelave = posicionYdelave + (gravedad);
  }

  setTimeout(recargarpagina,2000);
}

function recargarpagina()
{
    location.reload(true);
}

function recargarpagina2()
{
  document.addEventListener('keyup', detectarSalto,false);
   marcador=0;
   anchodeljuego=canvas.width;
   largodeljuego=canvas.height;
  //variables que me permiten conocer la posicion de la ave
   posicionXdelave=canvas.width/2;
   posicionYdelave=canvas.height/2;

   gravedad=8;


   largodelave=50;
   anchodelave=35;
   largopixelesdelave=20;
   anchopixelesdelave=15;
  //variable que  ayudaran a saber las posiciones de las distintas aves

   avepos = 0;
  //variables para los dos dintintos escenarios
   largodelescenario = canvas.width;
   anchodelesenario = canvas.height-100;
   escenarios = [[0,0], [146,0]];
  //var pipesarriba = [[56,322];
  //var pipesabajo =  [[83,322]];
  //llamado a la imagen donde estan los materiales a usar
   posicionXdelobstaculo = canvas.width;
   pos1= posicionXdelobstaculo-100;
   pos2= posicionXdelobstaculo - (150 * 2);
   pos3 = posicionXdelobstaculo-(150*3);
   pos4 = posicionXdelobstaculo-(150*4);
   separacionEntreObstaculos = 150;
   separacion = 120;
   iniciodereaparicion = -100;
   //primero haremos que aparezca el background
   pausa = true;
   estadodelJuego = false;
  //ajustes del teclado
   teclaprecionada = 0;
  //location.reload(true);

}

function detectarColision()
{
    //pipes de arriba
    if(pos2-25==posicionXdelave && posicionYdelave<=alturadeltubo2partedearriba || pos2+25==posicionXdelave && posicionYdelave<=alturadeltubo2partedearriba)
    {
      //console.log("Defeat");

      animaciondeperder();
    }
    if(pos1-25==posicionXdelave && posicionYdelave<=alturadeltubo1partedearriba || pos1+25==posicionXdelave && posicionYdelave<=alturadeltubo1partedearriba)
    {
      //console.log("Defeat");
      animaciondeperder();
    }
    //pipes de abajo
    if(pos2-25==posicionXdelave && posicionYdelave>=(canvas.height-100)-alturadeltubo2partedeabajo-50||pos2+25==posicionXdelave && posicionYdelave>=(canvas.height-100)-alturadeltubo2partedeabajo-50)
    {
      //console.log("Defeat");
      animaciondeperder();
    }
    if(pos1-25==posicionXdelave && posicionYdelave>=(canvas.height-100)-alturadeltubo1partedeabajo-50||pos1+25==posicionXdelave && posicionYdelave>=(canvas.height-100)-alturadeltubo1partedeabajo-50)
    {
      //console.log("Defeat");
      animaciondeperder();
    }
}

function dibujarMarcador(){
    ctx.font="bold 48px serif";
    ctx.fillStyle="#FDFEFE";
    ctx.fillText(marcador,canvas.width/2,40);
    //ctx.font="20px ComicSans";
    //ctx.fillStyle="#000000";
    //ctx.fillText("Vidas="+vida,520,20);
}

function pantalladederrota()
{
  ctx.font="bold 48px serif";
  ctx.fillStyle="#FDFEFE";
  ctx.fillText(marcador,canvas.width/2,canvas.height/2);
  //392,58
  ctx.drawImage(imagen,392,58,100,24,canvas.width/2-150,canvas.height/2,300,100);
}


function aumentarmarcador()
{
    if(pos1 == posicionXdelave)
    {
      marcador++;
    }
    if (pos2 == posicionXdelave) {
      marcador++;
    }
    // /console.log(marcador);
}

var velocidad = 55;
setInterval(mainprincipal,velocidad);

function pantalladeInicio()
{
  //348.89 //441.88
  //441-348 = 93
  //348,116
  //116-89 = 27
  dibujarBackGround();
  dibujarObstaculos();
  dibujarAve();
  ctx.drawImage(imagen,348,89,93,27, canvas.width/2-150, canvas.height/2-250, 300,100);
  //293,57
  //388,57
  //388-293=95
  //293,81
  //81-57 = 25
  ctx.drawImage(imagen,293,57,96,25, canvas.width/2-125, canvas.height/2-120, 250,80);
  //291,109
  //349,109
  //349-291 = 58
  //291,140
  //140-109 = 31
  ctx.drawImage(imagen,291,109,58,31, canvas.width/2-50, canvas.height/2+10, 100,50);
  //351,116
  //407,116
  //407-351 =
  //351,147
  //147-116 = 32


  ctx.drawImage(imagen,351,116,57,32, canvas.width/2-50, canvas.height/2+80, 100,50);
}

function mainprincipal()
{
  pantalladeInicio();
  //document.removeEventListener('keyup', detectarSalto,false);
  if(estadodelJuego != false)
  {
    draw();
  }
}
