import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FechasI } from 'src/app/models/proyeccion/fechas.interface';
import { ProyeccionService } from 'src/app/services/proyeccion/proyeccion.service';
import { DialogmisproyeccionesComponent } from '../dialogmisproyecciones/dialogmisproyecciones.component';

import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { GanttI } from 'src/app/models/proyeccion/diagramagantt.interface';

import * as moment from 'moment';


@Component({
  selector: 'app-dialogmiproyeccion',
  templateUrl: './dialogmiproyeccion.component.html',
  styleUrls: ['./dialogmiproyeccion.component.css'],
})
export class DialogmiproyeccionComponent implements OnInit {

  // modulos y variables para cargar las tablas que se usan 
  displayedpedido: string[] = ['detalle', 'cantidad', 'estado', 'acciones'];
  datapedido: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  token: string = '';

  // variables para el uso del diagrama de gantt
  // public editorOptions: GanttEditorOptions;
  // public data: any;
  // @ViewChild(GanttEditorComponent, { static: true }) editor: GanttEditorComponent;

  hojapedido = {
    detalle: '',
    cantidad: '',
    estado: 'NO APROBADO',
  };
  dataGantt: any = {};

  abrirActividades: boolean = false;

  // variable para el objeto de fecha
  fechas: FechasI;
  fechaUpdate = {
    fechas_pro: '',
    id_pro: '',
    token: '',
  };

  hojapedidoupadte = {
    id_hoja: '',
    hojapedido_hoja: '',
    token: '',
  };

  actividadesupadte = {
    id_act: '',
    actividades_act: '',
    token: '',
  };

  mailhojapedido = {
    codigoproceso: '',
    usuario: '',
    token: '',
  };

  diasTrabajados: string = '';

  // variable para guardar las proyecciones
  listaproyecciones: any[];
  listahojapedido: any[];
  listaactividades: any[];
  listaActividadesPrincipales: any[] =[]

  lastIndex: number = 0;
//variable para mostrar le boton de guardar
  mostrarBoton: boolean = false;
  // variables para capturar los datos de la proyeccion individual
  proyeccion: any;
  codigoproceso: string = '';
  observacion: string = '';
  fechaactual: string = '';
  id_pro: string = '';
  id_hoja: string = '';
  id_act: string = '';

  enablefechas: boolean;

  // ------------------------------------------------


  //variable para almacenar los dias guardados del proyecto
  diasGuardados: any[] = [];

  public editorOptions: any = {};
  public data: any;
  public data2: any;

  vUseSingleCell = '0';
  vShowRes = '0';
  vShowCost = '0';
  vShowComp = '0';
  vShowDur = '0';
  vShowStartDate = '0';
  vShowEndDate = '0';
  vShowPlanStartDate = '0';
  vShowPlanEndDate = '0';
  vShowEndWeekDate = '0';
  vShowTaskInfoLink = '0';
  vDebug = 'false';
  vEditable = 'false';
  vUseSort = 'false';
  vLang = 'es';
  delay = 150;

  @ViewChild('editor', { static: true }) editor: GanttEditorComponent;
  @ViewChild('editorTwo', { static: true }) editorTwo: GanttEditorComponent;

  // ------------------------------------------------


  // variables para guardar el diagrama
  listaganttgeneral: any[] = [];
  listaganttactividades: any[] = [];
  subactividad: GanttI;

  // variables para mostrar campos
  showSubactividades: boolean = false;

  fechaInicioProyecto: string = '';

  constructor(
    private _cookie: CookieService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _proyeccion: ProyeccionService
  ) {

    this.editorOptions = new GanttEditorOptions()
    /* this.data = [{
      'pID': 1,
      'pName': 'Define Chart API',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Andres',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    }]; */

  }

  ngOnInit(): void {
    this.token = this._cookie.get('token');
    this.enablefechas = true;
    this.listahojapedido = [];
    this.listaactividades = [];
    this.listaganttgeneral = [];
    this.listaganttactividades = [];
    this.showSubactividades = false;

    this.subactividad = {
      pID: '',
      pName: '',
      pStart: '',
      pEnd: '',
      pClass: '',
      pLink: '',
      pMile: '',
      pRes: '',
      pComp: '',
      pGroup: '',
      pParent: '',
      pOpen: '',
      pDepend: '',
      pCaption: '',
      pNotes: ''
    }

    // 'pID': '11',
    //   'pName': 'Actividad 1',
    //   'pStart': '2022-02-18', //fecha de inicio
    //   'pEnd': '2022-02-20', // fecha de fin
    //   'pClass': 'ggroupblack',  // color y forma de la barra  
    //   // gtaskblue = azul, gtaskyellow = amarillo, gtaskred = rojo
    //   // ggroupblack = barra negra del total
    //   'pLink': '',
    //   'pMile': 0,
    //   'pRes': 'Shlomy',
    //   'pComp': 100, // porcentaje de trabajo realizado
    //   'pGroup': 1, // para que se grafique la barra
    //   'pParent': 1, // para unir a la actividad principal por ejemplo de la actidad 1 este se uniria a 1 
    //   'pOpen': 1,
    //   'pDepend': '', // para unir nodos
    //   'pCaption': '',
    //   'pNotes': '' // para mostrar alguna nota de ser el caso

    this.listaganttactividades = []

    this.fechas = {
      fechaentrega: '',
      fechacalificacion: '',
      fechaconvalidacion: '',
      fechapuja: '',
      id_pro: '',
    };

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    if (mes < 10 && dia < 10) {
      this.fechaactual = anio + '-0' + mes + '-0' + dia;
    } else if (mes < 10) {
      this.fechaactual = anio + '-0' + mes + '-' + dia;
    } else if (dia < 10) {
      this.fechaactual = anio + '-' + mes + '-0' + dia;
    } else {
      this.fechaactual = anio + '-' + mes + '-' + dia;
    }

    this.listaganttgeneral = [];
    this.listaganttactividades = [{
      pID: '',
      pName: '',
      pStart: '',
      pEnd: '',
      pClass: '',
      pLink: '',
      pMile: '',
      pRes: '',
      pComp: '',
      pGroup: '',
      pParent: '',
      pOpen: '',
      pDepend: '',
      pCaption: '',
      pNotes: ''
    }];

    this.listaActividadesPrincipales = []

    // este objeto lo usare para guardar cada actividad principal ya que la barra debe ser distinta 
    // es decir sera una linea de color negro que contenga todas las sub actividadades
    this.subactividad = {
      pID: '',
      pName: '',
      pStart: '',
      pEnd: '',
      pClass: 'ggroupblack',
      pLink: '',
      pMile: '',
      pRes: '',
      pComp: '',
      pGroup: '',
      pParent: '',
      pOpen: '',
      pDepend: '',
      pCaption: '',
      pNotes: ''
    }
    // this.listaganttactividades = [{
    //   pID: '',
    // pName: '',
    // pStart: '',
    // pEnd: '',
    // pClass: '',
    // pLink: '',
    // pMile: '',
    // pRes: '',
    // pComp: '',
    // pGroup: '',
    // pParent: '',
    // pOpen: '',
    // pDepend: '',
    // pCaption: '',
    // pNotes: ''
    // },
    // {
    //   pID: '',
    // pName: '',
    // pStart: '',
    // pEnd: '',
    // pClass: '',
    // pLink: '',
    // pMile: '',
    // pRes: '',
    // pComp: '',
    // pGroup: '',
    // pParent: '',
    // pOpen: '',
    // pDepend: '',
    // pCaption: '',
    // pNotes: ''
    // }]

    this.listaganttgeneral.push(this.listaganttactividades);

    console.log(this.listaganttactividades);
    console.log(this.listaganttgeneral);


    // this.data = this.initialData();
    // this.editorOptions = {
    //   vFormat: "day",
    //   vEditable: true,
    //   vEventsChange: {
    //     taskname: () => {
    //       console.log("taskname");
    //     }
    //   }
    // };

    // -----------------------------------------------

    this.data = this.initialData();

    this.data2 = [{
      'pID': 1,
      'pName': 'Define Chart API v2',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    }];

    const vAdditionalHeaders = {
      category: {
        title: 'Category'
      },
      sector: {
        title: 'Sector'
      }
    };


    this.editorOptions = {
      // vCaptionType: 'none',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
      vQuarterColWidth: 36,
      vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
      vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
      vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
      vLang: this.vLang,
      vUseSingleCell: this.vUseSingleCell,

      // si colocas estos valores no se mostrar en el grafico
      vShowRes: parseInt(this.vShowRes, 10),
      vShowCost: parseInt(this.vShowCost, 10),
      vShowComp: parseInt(this.vShowComp, 10),
      vShowDur: parseInt(this.vShowDur, 10),
      vShowStartDate: parseInt(this.vShowStartDate, 10),
      vShowEndDate: parseInt(this.vShowEndDate, 10),
      vShowPlanStartDate: parseInt(this.vShowPlanStartDate, 10),
      vShowPlanEndDate: parseInt(this.vShowPlanEndDate, 10),
      vShowTaskInfoLink: parseInt(this.vShowTaskInfoLink, 10), // Show link in tool tip (0/1)
      // Show/Hide the date for the last day of the week in header for daily view (1/0)
      vShowEndWeekDate: parseInt(this.vShowEndWeekDate, 10),
      // vAdditionalHeaders: vAdditionalHeaders,
      vEvents: {
        taskname: console.log,
        res: console.log,
        dur: console.log,
        comp: console.log,
        start: console.log,
        end: console.log,
        planstart: console.log,
        planend: console.log,
        cost: console.log
      },
      // vEventsChange: {
      //   taskname: this.editValue.bind(this, this.data),
      //   res: this.editValue.bind(this, this.data),
      //   dur: this.editValue.bind(this, this.data),
      //   comp: this.editValue.bind(this, this.data),
      //   start: this.editValue.bind(this, this.data),
      //   end: this.editValue.bind(this, this.data),
      //   planstart: this.editValue.bind(this, this.data),
      //   planend: this.editValue.bind(this, this.data),
      //   cost: this.editValue.bind(this, this.data)
      // },
      // vResources: [
      //   { id: 0, name: 'Anybody' },
      //   { id: 1, name: 'Mario' },
      //   { id: 2, name: 'Henrique' },
      //   { id: 3, name: 'Pedro' }
      // ],
      vEventClickRow: console.log,
      vTooltipDelay: this.delay,
      vDebug: this.vDebug === 'true',
      vEditable: this.vEditable === 'true',
      vUseSort: this.vUseSort === 'true',
      vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
      vFormat: 'day'
    };
    this.editor.setOptions(this.editorOptions);
    // this.editorOptions.onChange = this.change.bind(this);

    // -----------------------------------------------


  }

  addPedido() {
    if (this.hojapedido.detalle == '') {
      this.toastError('Debes ingresar el detalle para continuar');
    } else if (this.hojapedido.cantidad == '') {
      this.toastError('Debes ingresar la cantidad para continuar');
    } else {
      this.hojapedido.estado = 'NO APROBADO';

      if (!this.listahojapedido.length) {
        this.listahojapedido[0] = this.hojapedido;
      } else {
        this.listahojapedido.push(this.hojapedido);
      }

      this.hojapedidoupadte.id_hoja = this.id_hoja;
      this.hojapedidoupadte.token = this.token;
      this.hojapedidoupadte.hojapedido_hoja = JSON.stringify(
        this.listahojapedido
      );

      console.log(this.hojapedidoupadte);

      this._proyeccion.updateHojapedido(this.hojapedidoupadte).subscribe((res) => {
        console.log(res);

        if (res.data) {
          this.datapedido = new MatTableDataSource(this.listahojapedido);
          this.datapedido.paginator = this.paginator;

          this.hojapedido = {
            detalle: '',
            cantidad: '',
            estado: 'NO APROBADO',
          };

        }
      });
    }
  }

  enviarMail() {
    if (!this.listahojapedido.length) {
      this.toastError('No tenemos registrado ningun pedido');
    } else {
      this.mailhojapedido.codigoproceso = this.codigoproceso;
      this.mailhojapedido.token = this.token;
      this.mailhojapedido.usuario = 'Prueba';

      this._proyeccion.sendMailHojapedido(this.mailhojapedido).subscribe((res) => {
        if (res.data) {
          this.toastSuccess(
            'Solicitud enviada, recibira un correo de confirmación una vez aprobado su solicitud.'
          );
        }
      });
    }
  }

  proyecciones() {
    const dialogRef = this.dialog.open(DialogmisproyeccionesComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);

      if (res != undefined) {
        this.codigoproceso = res.descripcion_pro;
        this.observacion = '';
        this.id_pro = res.id_pro;
        this.fechas.fechacalificacion = res.fechas_pro.fechacalificacion;
        this.fechas.fechaconvalidacion = res.fechas_pro.fechaconvalidacion;
        this.fechas.fechaentrega = res.fechas_pro.fechaentrega;
        this.fechas.fechapuja = res.fechas_pro.fechapuja;
        this.proyeccion = res;

        if (res.fechas_pro.length) {
          this.enablefechas = true;
        } else {
          this.enablefechas = false;
        }

        this._proyeccion.getProyeccionhojapedido(this.token, this.id_pro).subscribe((res) => {
          console.log(res);

          if (res.data.length) {

            this.id_hoja = res.data[0].id_hoja;

            this.listahojapedido = JSON.parse(res.data[0].hojapedido_hoja);

          } else {
            this.listahojapedido = [];
          }

          this.datapedido = new MatTableDataSource(this.listahojapedido);
          this.datapedido.paginator = this.paginator;

        });

        this._proyeccion.getProyeccionactividades(this.token, this.id_pro).subscribe(res => {

          console.log(res);

          if (res.data.length) {
            this.id_act = res.data[0].id_act;
            this.listaactividades = JSON.parse(res.data[0].actividades_act);
          } else {
            this.listaactividades = [];
            this.listaganttgeneral = [
              {
                'pID': 1,
                'pName': 'Proyecto',
                'pStart': '',
                'pEnd': '',
                'pClass': 'ggroupblack',
                'pLink': '',
                'pMile': 0,
                'pRes': '',
                'pComp': 0,
                'pGroup': 1,
                'pParent': 0,
                'pOpen': 1,
                'pDepend': '',
                'pCaption': '',
                'pNotes': ''
              }
            ]
          }

        });
        // this.id_hoja = res.id_hoja;

        // this.id_act = res.id_act;
      }
    });
  }

  guardarFechas() {
    if (this.fechas.fechaentrega == '') {
      this.toastError('EL campo fecha de entrega esta vacio');
    } else if (this.fechas.fechacalificacion == '') {
      this.toastError('EL campo fecha de calificación esta vacio');
    } else if (this.fechas.fechapuja == '') {
      this.toastError('EL campo fecha de puja esta vacio');
    } else if (
      this.fechas.fechaentrega <= this.fechaactual ||
      this.fechas.fechacalificacion <= this.fechaactual ||
      this.fechas.fechapuja <= this.fechaactual
    ) {
      this.toastError(
        'La fecha seleccionada no puede ser menor o igual a la fecha actual'
      );
    } else {
      this.fechaUpdate.fechas_pro = JSON.stringify(this.fechas);
      this.fechaUpdate.id_pro = this.id_pro;
      this.fechaUpdate.token = this.token;

      this._proyeccion.updateFechas(this.fechaUpdate).subscribe((res) => {
        if (res.data) {
          this.toastSuccess(
            'Hemos registrado exitosamente las fechas del proyecto'
          );
        } else {
          this.toastError(
            'Tenemos problemas para registrar las fechas intentalo nuevamente'
          );
        }
      });
    }
  }

  // funcion para eliminar los detalles de la hoja de pedido
  deleteDetalleHp(detalle) {
    for (let i = 0; i < this.listahojapedido.length; i++) {
      if (
        this.listahojapedido[i].cantidad == detalle.cantidad &&
        this.listahojapedido[i].detalle == detalle.detalle
      ) {
        this.listahojapedido.splice(i, 1);
        break;
      }
    }

    this.datapedido = new MatTableDataSource(this.listahojapedido);
    this.datapedido.paginator = this.paginator;
  }


  crearSubactividades(j: number) {
    // esta funcion la usare para mostrar el boton de subactividades
    // se usa un booleano para mostrar o no el cuadro.

    
    // for(let i=0; i<this.listaActividadesPrincipales.length; i++){
      if (this.listaActividadesPrincipales[j].pName == '' || this.listaActividadesPrincipales[j].pName == null) {
        this.toastError("No has registrado el nombre de la actividad principal");
      } else if (this.listaActividadesPrincipales[j].pRes == '' || this.listaActividadesPrincipales[j].pRes == null) {
        this.toastError("No has ingresado al responsable");
      } else {
        // this.listaganttactividades.push(this.subactividad);
        this.listaActividadesPrincipales[j].pNum = j + 1;
        
        this.listaActividadesPrincipales[j].subactividad.push({
          pID: this.listaActividadesPrincipales[j].pNum + '' + (this.listaActividadesPrincipales[j].subactividad.length + 1),
          pName: '',
          pStart: '',
          pEnd: '',
          pClass: '',
          pLink: '',
          pMile: '',
          pRes: '',
          pComp: '',
          pGroup: this.listaActividadesPrincipales[j].pNum,
          pParent: this.listaActividadesPrincipales[j].pNum,
          pOpen: '',
          pDepend: '',
          pCaption: '',
          pNotes: ''
        });

        // this.listaActividadesPrincipales[j].subactividad
        this.mostrarBoton = true;
        console.log(this.listaActividadesPrincipales);
      }
    // }
    

  }

  // funcion para añadir una subactividad
  addSubactividad() {


    // para añadir la sub actividad primero verifico la distancia dela lista general
    // luego añado la lista de actividades a la lista general en un array de subarrays

    // se ocupa un objeto de tipo subactividad el que sera guardado en cada posicion del array

    console.log(this.listaganttactividades.length);

    this.listaganttactividades.push({
      pID: '',
      pName: '',
      pStart: '',
      pEnd: '',
      pClass: '',
      pLink: '',
      pMile: '',
      pRes: '',
      pComp: '',
      pGroup: '',
      pParent: '',
      pOpen: '',
      pDepend: '',
      pCaption: '',
      pNotes: ''
    });

    console.log(this.listaganttactividades);

  }



  // funciones para agregar contenido en las variables de gantt 
  // ejemplo

  // -------------------------------------------------------

  setLanguage(lang) {
    this.editorOptions.vLang = lang;
    this.editor.setOptions(this.editorOptions);
  }

  customLanguage() {
    // this.editorOptions.languages = {
    //   'pt-BR': {
    //     'auto': 'Automático testing'
    //   },
    //   'en': {
    //     'auto': 'Auto testing'
    //   }
    // };
    this.editor.setOptions(this.editorOptions);
  }

  changeObject() {
    this.data.randomNumber = Math.random() * 100;
  }

  changeData() {
    this.data = Object.assign({}, this.data,
      { randomNumber: Math.random() * 100 });
  }

  initialData() {
    return [{
      'pID': 1,
      'pName': 'Inicio del proyecto',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Andres',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    },
    {
      'pID': '11',
      'pName': 'Actividad 1',
      'pStart': '2022-02-18', //fecha de inicio
      'pEnd': '2022-02-20', // fecha de fin
      'pClass': 'ggroupblack',  // color y forma de la barra  
      // gtaskblue = azul, gtaskyellow = amarillo, gtaskred = rojo
      // ggroupblack = barra negra del total
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 100, // porcentaje de trabajo realizado
      'pGroup': 1, // para que se grafique la barra
      'pParent': 1, // para unir a la actividad principal por ejemplo de la actidad 1 este se uniria a 1 
      'pOpen': 1,
      'pDepend': '', // para unir nodos
      'pCaption': '',
      'pNotes': '' // para mostrar alguna nota de ser el caso
    },
    {
      'pID': 111,
      'pName': 'Subactividad 1',
      'pStart': '2022-02-18', //fecha de inicio
      'pEnd': '2022-02-21', // fecha de fin
      'pClass': 'gtaskred',  // color y forma de la barra  
      // gtaskblue = azul, gtaskyellow = amarillo, gtaskred = rojo
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 100, // porcentaje de trabajo realizado
      'pGroup': 0, // para que se grafique la barra
      'pParent': 11, // para unir a la actividad principal por ejemplo de la actidad 1 este se uniria a 1 
      'pOpen': 1,
      'pDepend': '', // para unir nodos
      'pCaption': '',
      'pNotes': '' // para mostrar alguna nota de ser el caso
    },
    {
      'pID': 12,
      'pName': 'Actividad 2',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': '',
      'pGroup': 1,
      'pParent': 1,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 121,
      'pName': 'subactividad 2',
      'pStart': '2022-02-21',
      'pEnd': '2022-03-09',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian T.',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': 111,
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': '13',
      'pName': 'Actividad 3',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack', // 
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy', // Shlomy
      'pComp': '', // 40
      'pGroup': 1, // 1
      'pParent': 1,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 131,
      'pName': 'Subactividad 3',
      'pStart': '2022-02-27',
      'pEnd': '2022-03-03',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian T.',
      'pComp': 70,
      'pGroup': 0,
      'pParent': 13,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 132,
      'pName': 'Subactividad 3.1',
      'pStart': '2022-03-03',
      'pEnd': '2022-03-13',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian T.',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 13,
      'pOpen': 1,
      'pDepend': 131,
      'pCaption': '',
      'pNotes': ''
    }
    /* ,
    {
      'pID': 2,
      'pName': 'Inicio proyecto 1',
      'pStart': '2022-03-03',
      'pEnd': '2022-03-13',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian T.',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': 2,
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 21,
      'pName': 'Inicio del proyecto',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Andres',
      'pComp': 0,
      'pGroup': 2,
      'pParent': 2,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    } */
      // {
      //   'pID': 122,
      //   'pName': 'Task Variables',
      //   'pStart': '2022-03-06',
      //   'pEnd': '2022-03-11',
      //   'pPlanStart': '2022-03-03',
      //   'pPlanEnd': '2022-03-09',
      //   'pClass': 'gtaskred',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 12,
      //   'pOpen': 1,
      //   'pDepend': 121,
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 123,
      //   'pName': 'Task by Minute/Hour',
      //   'pStart': '',
      //   'pEnd': '',
      //   'pPlanStart': '2022-03-01',
      //   'pPlanEnd': '2022-03-15 12:00',
      //   'pClass': 'gtaskyellow',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Ilan',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 12,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': '',
      //   'pCost': 1000
      // },
      // {
      //   'pID': 124,
      //   'pName': 'Task Functions',
      //   'pStart': '2022-03-09',
      //   'pEnd': '2022-03-29',
      //   'pClass': 'gtaskred',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Anyone',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 12,
      //   'pOpen': 1,
      //   'pDepend': '123SS',
      //   'pCaption': 'This is a caption',
      //   'pNotes': null
      // },
      // {
      //   'pID': 2,
      //   'pName': 'Create HTML Shell',
      //   'pStart': '2022-03-24',
      //   'pEnd': '2022-03-24',
      //   'pClass': 'gtaskyellow',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 20,
      //   'pGroup': 0,
      //   'pParent': 0,
      //   'pOpen': 1,
      //   'pDepend': 122,
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 3,
      //   'pName': 'Code Javascript',
      //   'pStart': '',
      //   'pEnd': '',
      //   'pClass': 'ggroupblack',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 0,
      //   'pGroup': 1,
      //   'pParent': 0,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 31,
      //   'pName': 'Define Variables',
      //   'pStart': '2022-02-25',
      //   'pEnd': '2022-03-17',
      //   'pClass': 'gtaskpurple',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 30,
      //   'pGroup': 0,
      //   'pParent': 3,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 32,
      //   'pName': 'Calculate Chart Size',
      //   'pStart': '2022-03-15',
      //   'pEnd': '2022-03-24',
      //   'pClass': 'gtaskgreen',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Shlomy',
      //   'pComp': 40,
      //   'pGroup': 0,
      //   'pParent': 3,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 33,
      //   'pName': 'Draw Task Items',
      //   'pStart': '',
      //   'pEnd': '',
      //   'pClass': 'ggroupblack',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Someone',
      //   'pComp': 40,
      //   'pGroup': 2,
      //   'pParent': 3,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 332,
      //   'pName': 'Task Label Table',
      //   'pStart': '2022-03-06',
      //   'pEnd': '2022-03-09',
      //   'pClass': 'gtaskblue',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 33,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 333,
      //   'pName': 'Task Scrolling Grid',
      //   'pStart': '2022-03-11',
      //   'pEnd': '2022-03-20',
      //   'pClass': 'gtaskblue',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 0,
      //   'pGroup': 0,
      //   'pParent': 33,
      //   'pOpen': 1,
      //   'pDepend': '332',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 34,
      //   'pName': 'Draw Task Bars',
      //   'pStart': '',
      //   'pEnd': '',
      //   'pClass': 'ggroupblack',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Anybody',
      //   'pComp': 60,
      //   'pGroup': 1,
      //   'pParent': 3,
      //   'pOpen': 0,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 341,
      //   'pName': 'Loop each Task',
      //   'pStart': '2022-03-26',
      //   'pEnd': '2022-04-11',
      //   'pClass': 'gtaskred',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 34,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 342,
      //   'pName': 'Calculate Start/Stop',
      //   'pStart': '2022-04-12',
      //   'pEnd': '2022-05-18',
      //   'pClass': 'gtaskpink',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 34,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 343,
      //   'pName': 'Draw Task Div',
      //   'pStart': '2022-05-13',
      //   'pEnd': '2022-05-17',
      //   'pClass': 'gtaskred',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 34,
      //   'pOpen': 1,
      //   'pDepend': '',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 344,
      //   'pName': 'Draw Completion Div',
      //   'pStart': '2022-05-17',
      //   'pEnd': '2022-06-04',
      //   'pClass': 'gtaskred',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 60,
      //   'pGroup': 0,
      //   'pParent': 34,
      //   'pOpen': 1,
      //   'pDepend': '342,343',
      //   'pCaption': '',
      //   'pNotes': ''
      // },
      // {
      //   'pID': 35,
      //   'pName': 'Make Updates',
      //   'pStart': '2022-07-17',
      //   'pEnd': '2022-09-04',
      //   'pClass': 'gtaskpurple',
      //   'pLink': '',
      //   'pMile': 0,
      //   'pRes': 'Brian',
      //   'pComp': 30,
      //   'pGroup': 0,
      //   'pParent': 3,
      //   'pOpen': 1,
      //   'pDepend': '333',
      //   'pCaption': '',
      //   'pNotes': ''
      // }
    ];
  }

  // -------------------------------------------------------

  // mensajes

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    if (filtro == '' || filtro == null) {
    } else {
      filtro = filtro.trim(); // Remove whitespace
      filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.datapedido.filter = filtro;
    }
  }

  // funcion para guardar las actividades
  guardarActividades(){
    
    console.log(this.listaActividadesPrincipales);
    
    /* {
      'pID': 1,
      'pName': 'Inicio del proyecto',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Andres',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
    } */

    this.dataGantt = 
    [{
      'pID': 1,
      'pName': this.proyeccion.informacion_pro,
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Andres',
      'pComp': 0,
      'pGroup': 0,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
    },
    {
      'pID': 11,
      'pName': 'Actividad 1',
      'pStart': '2022-02-18', //fecha de inicio
      'pEnd': '2022-02-20', // fecha de fin
      'pClass': 'ggroupblack',  // color y forma de la barra  
      // gtaskblue = azul, gtaskyellow = amarillo, gtaskred = rojo
      // ggroupblack = barra negra del total
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 100, // porcentaje de trabajo realizado
      'pGroup': 1, // para que se grafique la barra
      'pParent': 1, // para unir a la actividad principal por ejemplo de la actidad 1 este se uniria a 1 
      'pOpen': 1,
      'pDepend': '', // para unir nodos
      'pCaption': '',
      'pNotes': '' // para mostrar alguna nota de ser el caso
    },
    {
      'pID': 111,
      'pName': 'Subactividad 1',
      'pStart': '2022-02-18', //fecha de inicio
      'pEnd': '2022-02-21', // fecha de fin
      'pClass': 'gtaskred',  // color y forma de la barra  
      // gtaskblue = azul, gtaskyellow = amarillo, gtaskred = rojo
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 100, // porcentaje de trabajo realizado
      'pGroup': 0, // para que se grafique la barra
      'pParent': 11, // para unir a la actividad principal por ejemplo de la actidad 1 este se uniria a 1 
      'pOpen': 1,
      'pDepend': '', // para unir nodos
      'pCaption': '',
      'pNotes': '' // para mostrar alguna nota de ser el caso
    }]
    
     this.dataGantt = {
      nombreProyecto: this.proyeccion.informacion_pro,

      actividades: [...this.listaActividadesPrincipales]
    };

    console.log(this.dataGantt);

    this.data = this.initialData();
    
    
  }

  // funcion para agregar las actividades
  agregarActividades(){

    this.abrirActividades = true;


    this.listaActividadesPrincipales.push({
      pName: '',
      pRes: '',
      pNum: this.listaActividadesPrincipales.length + 1,
      pStart: '',
      pEnd: '',
      pClass: ''
    });


    
  }

  //funcion para cuando cambie la fecha
  cambioFecha(fecha: string){
    let fechaActual = moment();
    let dividir = fecha.split('-');
    let fechaUnir = dividir[0]+'-'+dividir[1]+'-'+dividir[2];
    let fechaProyectoInicio = moment(fechaUnir);
    let fechaDespues = moment(fechaUnir).add(parseInt(this.proyeccion.tiempo_pro), 'months');
    
    console.log(fechaDespues);
    
    console.log(fechaDespues.diff(fechaProyectoInicio, 'days'), 'dias de diferencia');
    
    
    /* while(fechaProyectoInicio.isSameOrBefore(fechaDespues)){
      console.log(fechaProyectoInicio.add(1, 'days').format('YYYY-MM-DD'));

      // this.diasGuardados.push(fechaProyectoInicio.add(1, 'd'));
      
    } */

    console.log(this.diasGuardados);
    
    

    
  }

  agregarSubActividades(){
    
  }
}
