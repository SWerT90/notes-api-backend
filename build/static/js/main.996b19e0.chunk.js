(this.webpackJsonpclase4=this.webpackJsonpclase4||[]).push([[0],{39:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var c=e(15),o=e.n(c),a=e(6),r=e(4),i=e(2),u=e(0),s=function(t){var n=t.note,e=t.toogleImportance,c=n.important?"make not important":"make important";return Object(u.jsxs)("li",{className:"note",children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})},l=function(t){var n=t.message;return null===n?null:Object(u.jsx)("div",{className:"error",children:n})},j=e(3),f=e.n(j),b=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, University of Mibas 2021"})]})};function d(){var t=Object(i.useState)([]),n=Object(r.a)(t,2),e=n[0],c=n[1],o=Object(i.useState)(""),j=Object(r.a)(o,2),d=j[0],p=j[1],m=Object(i.useState)("false"),h=Object(r.a)(m,2),O=h[0],x=h[1],v=Object(i.useState)(null),g=Object(r.a)(v,2),S=g[0],N=g[1],k=Object(i.useState)(!0),C=Object(r.a)(k,2),y=C[0],E=C[1];Object(i.useEffect)((function(){x(!0),f.a.get("/api/notes").then((function(t){return t.data})).then((function(t){c(t),x(!1)})).catch((function(t){x(!1),N("No se han podido recuperar las notas. Error: ".concat(t.message)),setTimeout((function(){N(null)}),5e3)}))}),[]);var I=function(t){return function(){var n=e.find((function(n){return n.id===t}));(function(t){return f.a.put("/api/notes/".concat(t.id),t).then((function(t){return t.data}))})(Object(a.a)(Object(a.a)({},n),{},{important:!n.important})).then((function(n){c(e.map((function(e){return e.id!==t?e:n})))})).catch((function(t){N("No se ha podido actualizar la importacia de la nota. Error: ".concat(t.message)),setTimeout((function(){N(null)}),5e3)}))}},w=y?e:e.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)(l,{message:S}),O?"Cargando...":"",Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){E((function(){return!y}))},children:["show ",y?"important":"all"]})}),Object(u.jsx)("ol",{children:w.map((function(t){return Object(u.jsx)(s,{note:t,toogleImportance:I(t.id)},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault(),function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))}({title:d,content:d,userId:1,important:Math.random()<.5}).then((function(t){c((function(n){return n.concat(t)}))})).catch((function(t){N("No se ha podido a\xf1adir una nueva nota. Error: ".concat(t.message)),setTimeout((function(){N(null)}),5e3)})),p("")},children:[Object(u.jsx)("input",{type:"text",onChange:function(t){p(t.target.value)},value:d}),Object(u.jsx)("button",{children:"Crear nota"})]}),Object(u.jsx)(b,{})]})}e(39);o.a.render(Object(u.jsx)(d,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.996b19e0.chunk.js.map