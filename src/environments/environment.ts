// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  // base de datos agua amaguaña
  // firebaseConfig : {
  //   apiKey: "AIzaSyAACy8ZoxzrQJLWRpDrZH2GkaC0IE-H20Q",
  //   authDomain: "vtproyectosagua.firebaseapp.com",
  //   projectId: "vtproyectosagua",
  //   storageBucket: "vtproyectosagua.appspot.com",
  //   messagingSenderId: "606065768118",
  //   appId: "1:606065768118:web:75bb83c2ddcfc329465817",
  //   measurementId: "G-LFGK1G8C68"
  // },
  // base de datos en produccion... EMAPA_PED
  // firebaseConfig : {
  //   apiKey: "AIzaSyC2Z7qDIgHi7whUnMI7MxrUxCUG0L3EgmU",
  //   authDomain: "vtproyectos-9bd27.firebaseapp.com",
  //   projectId: "vtproyectos-9bd27",
  //   storageBucket: "vtproyectos-9bd27.appspot.com",
  //   messagingSenderId: "986286734881",
  //   appId: "1:986286734881:web:81332566ab64efdd546d60",
  //   measurementId: "G-H11JFRFSQR"
  // },
  // base de datos de pruebas EMAPA_PED
  // firebaseConfig : {
  //   apiKey: "AIzaSyA0B9ialWCnsqoXx8iefeYQGScvZ83dV-8",
  //   authDomain: "vtpruebas-12138.firebaseapp.com",
  //   projectId: "vtpruebas-12138",
  //   storageBucçket: "vtpruebas-12138.appspot.com",
  //   messagingSenderId: "251662873961",
  //   appId: "1:251662873961:web:e0faabc838beb6032bf9f8",
  //   measurementId: "G-1G6YKS61XW"
  // },
  // base de datos para los catastros PEDERNALES
  firebaseConfig: {
    apiKey: "AIzaSyA5ruOwpnXL5TKNTiEFqLjDCkrsLC8WtYE",
    authDomain: "vtcatastros.firebaseapp.com",
    projectId: "vtcatastros",
    storageBucket: "vtcatastros.appspot.com",
    messagingSenderId: "834632969614",
    appId: "1:834632969614:web:06fc839ed249527f2e88df",
    measurementId: "G-XG6EYDRWBH"
  },

  // base de datos cojimies
  // firebaseConfig: {
  //   apiKey: "AIzaSyCJSUq0KmZgEjJlsp2f5a7x8fu-Rm2527s",
  //   authDomain: "vtcatastrocojimies.firebaseapp.com",
  //   projectId: "vtcatastrocojimies",
  //   storageBucket: "vtcatastrocojimies.appspot.com",
  //   messagingSenderId: "1098852555639",
  //   appId: "1:1098852555639:web:079a49af266b7aaae89f72",
  //   measurementId: "G-QGQDJQX0RV"
  // },

  // baseUrl: "https://contable.vt-proyectos.com.ec/APIVTPROYECTOS",
  baseUrl: "http://localhost/VT/APIVTPROYECTOS",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
