"use strict";(self.webpackChunkclickpay_frontend=self.webpackChunkclickpay_frontend||[]).push([[790],{8507:function(e,t){t.Z=Object.freeze({pending:"pending",rejected:"rejected",approved:"approved"})},5853:function(e,t,n){n.r(t),n.d(t,{default:function(){return $}});var a=n(1413),r=n(2982),s=n(4165),o=n(5861),i=n(885),c=n(2591),l=n(719),u=n(2791),d="Status_Status__YNzkd",m="Status_Status__icons__jBri0",f=n(4164),p={ConfirmModal:"ConfirmModal_ConfirmModal__eRRAH",ConfirmModal__close:"ConfirmModal_ConfirmModal__close__kjfFH",ConfirmModal__heading:"ConfirmModal_ConfirmModal__heading__ktfcb",ConfirmModal__button:"ConfirmModal_ConfirmModal__button__ScRJL",ConfirmModal__text:"ConfirmModal_ConfirmModal__text__7zGvi",ConfirmModal__body:"ConfirmModal_ConfirmModal__body__knu6v"},h=n(8507),v=n(3360),_=n(184),g=document.getElementById("modal-root");var x=function(e){var t=e.id,n=e.updStatus,a=e.status,r=e.setModalIsOpen,s=function(){r(!1),document.body.style.overflow="unset"},o=function(e){e?(n(a,t),r(!1)):r(!0)};return(0,u.useEffect)((function(){var e=function(e){"Escape"===e.code&&s()};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}})),(0,f.createPortal)((0,_.jsx)("div",{className:"overlay",onClick:function(e){e.currentTarget!==e.target&&"Escape"!==e.code||s()},children:(0,_.jsxs)("div",{className:p.ConfirmModal,children:[(0,_.jsx)(l.czh,{className:p.ConfirmModal__close,onClick:s}),(0,_.jsxs)("div",{className:p.ConfirmModal__body,children:[(0,_.jsxs)("p",{className:p.ConfirmModal__text,children:[" ","Are you sure you want to"," ",a===h.Z.rejected?"reject":"approve"," the transaction?"]}),(0,_.jsxs)("div",{className:p.ConfirmModal__controllers,children:[(0,_.jsx)(v.Z,{className:p.ConfirmModal__button,onClick:function(){return o(!0)},children:"Yes"}),(0,_.jsx)(v.Z,{className:p.ConfirmModal__button,onClick:function(){return o(!1)},children:"No"})]})]})]})}),g)};var j=function(e){var t=e.status,n=e.updStatus,a=e.id,r=h.Z.pending,s=h.Z.rejected,o=h.Z.approved,c=(0,u.useState)(!1),f=(0,i.Z)(c,2),p=f[0],v=f[1],g=(0,u.useState)(!1),j=(0,i.Z)(g,2),C=j[0],S=j[1],Z=(0,u.useState)(r),k=(0,i.Z)(Z,2),N=k[0],y=k[1],b=function(e){y(e),S(!0),v(!1)};return(0,_.jsxs)("div",{className:d,children:[C&&(0,_.jsx)(x,{updStatus:n,id:a,status:N,setModalIsOpen:S}),t===r&&(0,_.jsx)(l.Q81,{onClick:function(){v(!0)}}),t===s&&(0,_.jsx)(l.czh,{}),t===o&&(0,_.jsx)(l.hXj,{})," ",p&&(0,_.jsxs)("div",{className:m,children:[(0,_.jsx)(l.czh,{onClick:function(){return b(s)}})," ",(0,_.jsx)(l.hXj,{onClick:function(){return b(o)}})]})]})};var C=function(e){var t=e.transactions,n=e.updStatus,a=function(e){var t=new Date(e).toISOString().substring(0,10).split("-").reverse().join("."),n=new Date(e).toISOString().substring(11,19).split(":");return[[1*n[0]+3,n[1],n[2]].join(":"),t].join(", ")};return(0,_.jsxs)(c.Z,{responsive:!0,children:[(0,_.jsx)("thead",{children:(0,_.jsxs)("tr",{children:[(0,_.jsx)("th",{children:"#"}),["Time","Account","Amount","Card","Name","Status","Updated at"].map((function(e,t){return(0,_.jsx)("th",{children:e},t)}))]})}),(0,_.jsx)("tbody",{children:t.map((function(e,t){return(0,_.jsxs)("tr",{children:[(0,_.jsx)("td",{children:t+1}),(0,_.jsx)("td",{children:a(e.createdAt)}),(0,_.jsx)("td",{children:e.account}),(0,_.jsxs)("td",{children:["".concat(e.amount)," ","euro"===e.currency?"\u20ac":"$"]}),(0,_.jsx)("td",{children:e.cardNumber}),(0,_.jsx)("td",{children:e.holderName}),(0,_.jsx)("td",{children:(0,_.jsx)(j,{status:e.status,updStatus:n,id:e._id})}),(0,_.jsx)("td",{children:e.createdAt===e.updatedAt?"-":a(e.updatedAt)})]},e._id)}))})]})},S="AdminView_AdminView__AlRC7",Z="AdminView_AdminView__wrapper__VfSlU",k=n(4569),N=n.n(k),y=n(7007),b=n(9694),w=n(7022),A="AdminLogout_AdminLogout__button__0y61i",L="AdminLogout_AdminLogout__RYo0R";var M=function(e){var t=e.setToken,n=e.setTransactions,a=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N().get("/users/logout");case 3:t(""),N().defaults.headers.common.Authorization="",e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),t(""),n([]),console.log("LOGOUT CATCH",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return(0,_.jsx)(b.Z,{className:L,children:(0,_.jsx)(w.Z,{children:(0,_.jsx)(v.Z,{className:A,onClick:a,children:"Log out"})})})},I=n(9410),O=n(9546),T=n(1122),F=n(5984),z="Filter_Filter__ydlvw";var E=function(e){var t=e.filterOptions,n=e.handleFilter,a=e.filterOption;return(0,_.jsx)("div",{className:z,children:(0,_.jsx)(I.Z,{className:"mb-3",children:(0,_.jsx)(O.Z,{variant:"outline-secondary",title:a.label,id:"input-group-dropdown-1",as:T.Z,children:t.map((function(e){return(0,_.jsxs)(T.Z.Item,{href:"#",onClick:function(){return n(e)},children:[e.label," "]},(0,F.x0)())}))})})})},P={Search__input:"Search_Search__input__tVt0o"};var J=function(e){var t=e.setSearchQuery,n=e.searchQuery;return(0,_.jsxs)("div",{className:P.Search,children:[" ",(0,_.jsx)("label",{htmlFor:"search",className:P.Search,children:(0,_.jsx)("input",{id:"search",type:"text",placeholder:"search query",onChange:function(e){localStorage.setItem("query",e.currentTarget.value),t(e.currentTarget.value)},className:P.Search__input,value:n})})]})},R=n(6048),H=n.n(R);var B=function(e){var t=e.pageCount,n=e.handlePageClick;return(0,_.jsx)(H(),{breakLabel:"...",nextLabel:"next",onPageChange:n,pageRangeDisplayed:5,pageCount:t,previousLabel:"previous",renderOnZeroPageCount:null,marginPagesDisplayed:3,containerClassName:"pagination justify-content-center",pageClassName:"page-item",pageLinkClassName:"page-link",previousClassName:"page-item",previousLinkClassName:"page-link",nextClassName:"page-item",nextLinkClassName:"page-link",breakClassName:"page-item",breakLinkClassName:"page-link",activeClassName:"active"})};var G=n(241),V="LoginForm_LoginForm__container__rmx24",q="LoginForm_LoginForm__button__0MSnH",D=n(1134);var Q=function(e){var t=e.setToken,n=(0,D.cI)(),r=n.register,i=n.handleSubmit,c=n.reset,l=n.formState.errors,u=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(n){var a,r,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=n.email,r=n.password,e.next=4,N().post("/users/login",{email:a,password:r});case 4:o=e.sent,console.log(o),t(o.data.user.token),N().defaults.headers.common.Authorization="Bearer ".concat(o.data.user.token),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("LOGIN CATCH",e.t0);case 13:c();case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}();return(0,_.jsxs)("div",{className:V,children:[" ",(0,_.jsx)(w.Z,{children:(0,_.jsxs)(G.Z,{onSubmit:i(u),children:[(0,_.jsx)("h2",{style:{marginBottom:"30px"},children:"Sign in"}),(0,_.jsxs)(G.Z.Group,{className:"mb-3",controlId:"formBasicEmail",children:[(0,_.jsx)(G.Z.Label,{children:"Email address"}),(0,_.jsx)(G.Z.Control,(0,a.Z)({type:"email",name:"email",placeholder:"Email"},r("email",{required:!0}))),l.email&&(0,_.jsx)("span",{children:"Fill the entry"})]}),(0,_.jsxs)(G.Z.Group,{className:"mb-3",controlId:"formBasicPassword",children:[(0,_.jsx)(G.Z.Label,{children:"Password"}),(0,_.jsx)(G.Z.Control,(0,a.Z)({type:"password",name:"password",placeholder:"Password"},r("password",{required:!0})))," ",l.password&&(0,_.jsx)("span",{children:"Fill the entry"})]}),(0,_.jsx)(v.Z,{variant:"primary",type:"submit",className:q,children:"Login"})]})})]})},U=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(t,n,a,r){var o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,N().defaults.headers.common.Authorization="Bearer ".concat(a),e.next=4,N().get("/transactions?page=".concat(t,"&limit=").concat(n));case 4:return o=e.sent,e.abrupt("return",o);case 8:e.prev=8,e.t0=e.catch(0),"not authorized"===(null===e.t0||void 0===e.t0?void 0:e.t0.response.data.message.toLowerCase())?(console.log("401"),r(""),sessionStorage.setItem("token",JSON.stringify(""))):console.log("GET ORIGINAL CATCH",e.t0.response.data.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n,a,r){return e.apply(this,arguments)}}(),Y=U,X=JSON.parse('[{"value":"all","label":"All"},{"value":"pending","label":"Pending"},{"value":"rejected","label":"Rejected"},{"value":"approved","label":"Approved"}]');var $=function(){var e=h.Z.pending,t=h.Z.rejected,n=h.Z.approved,c=function(){var e=(0,u.useState)(function(){var e=sessionStorage.getItem("token");return JSON.parse(e)}()),t=(0,i.Z)(e,2),n=t[0],a=t[1];return{setToken:function(e){sessionStorage.setItem("token",JSON.stringify(e)),a(e)},token:n}}(),l=c.token,d=c.setToken,m=(0,u.useState)(!1),f=(0,i.Z)(m,2),p=f[0],v=f[1],g=(0,u.useState)([]),x=(0,i.Z)(g,2),j=x[0],k=x[1],b=(0,u.useState)(""),w=(0,i.Z)(b,2),A=w[0],L=w[1],I=(0,u.useState)(1),O=(0,i.Z)(I,2),T=O[0],F=O[1],z=(0,u.useState)(X[0]),P=(0,i.Z)(z,2),R=P[0],H=P[1],G=(0,u.useState)(1),V=(0,i.Z)(G,2),q=V[0],D=V[1],U=25,$=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(t){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!l){e.next=6;break}return v(!0),localStorage.setItem("filter",JSON.stringify(t)),H(t),e.next=6,N().get("all"===t.value?"/transactions?page=".concat(q,"&limit=").concat(U):"/transactions/status/".concat(t.value,"?page=").concat(q,"&limit=").concat(U)).then((function(e){F(Math.ceil(e.data.totalNumber/U));var t=e.data.transactions;k(t)})).catch((function(e){console.log("FILTER CATCH",e.response.data.message),"not authorized"===e.response.data.message.toLowerCase()&&console.log(401)})).finally((function(){return v(!1)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(t){var n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v(!0),n=t.selected+1,Y(n,U,l,d).then((function(e){return e.data.transactions})).then((function(e){k(e),D(n)})).finally((function(){return v(!1)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=A.toLowerCase().trim();if(j)return j.filter((function(t){return t.holderName.toLowerCase().includes(e)||t.account.toString().includes(A.trim())}))}();return(0,u.useEffect)((function(){v(!0);var e=localStorage.getItem("filter");if(e){var t=JSON.parse(e);H(t)}else localStorage.setItem("filter",JSON.stringify(X[0])),console.log(X[0]);var n=localStorage.getItem("query");n&&L(n),v(!1)}),[]),(0,u.useEffect)((function(){if(l){v(!0);var a=JSON.parse(localStorage.getItem("filter"));Y(q,U,l,d).then((function(r){var s=r.data.transactions.sort((function(e,t){return t.createdAt.localeCompare(e.createdAt)})),o=s.filter((function(r){return a.value===e?r.status===e:a.value===t?r.status===t:a.value===n?r.status===n:s}));k(o),F(Math.ceil(r.data.totalNumber/U))})).finally((function(){return v(!1)}))}else sessionStorage.setItem("token",JSON.stringify("")),N().defaults.headers.common.Authorization=""}),[l]),(0,_.jsx)(_.Fragment,{children:l?(0,_.jsxs)("div",{className:S,children:[p&&(0,_.jsx)(y.Z,{}),(0,_.jsxs)("div",{children:[(0,_.jsxs)("div",{className:Z,children:[(0,_.jsx)(J,{setSearchQuery:L,searchQuery:A}),(0,_.jsx)(E,{filterOptions:X,filterOption:R,handleFilter:$})," "]}),(0,_.jsx)(M,{setToken:d,setTransactions:k}),(0,_.jsx)(C,{transactions:W,updStatus:function(e,t){l&&(v(!0),N().patch("/transactions/".concat(t,"/status"),{status:e}).then((function(e){var n=j.findIndex((function(e){return e._id===t})),s=(0,r.Z)(j),o=(0,a.Z)({},j[n]);o.status=e.data.status,o.updatedAt=e.data.updatedAt,s[n]=o,k(s)})).catch((function(e){console.log("UPDSTATUS CATCH",e),"not authorized"===e.response.data.message.toLowerCase()&&(d(""),console.log(401))})).finally((function(){return v(!1)})))}}),(0,_.jsx)(B,{itemsPerPage:U,pageCount:T,handlePageClick:K})]})]}):(0,_.jsx)(Q,{setToken:d})})}}}]);
//# sourceMappingURL=admin-view.c25e9f0f.chunk.js.map