(this["webpackJsonpgrace-shopper"]=this["webpackJsonpgrace-shopper"]||[]).push([[0],{60:function(e,t,r){},61:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(29),s=r.n(a),i=r(10),c=r(4),o=r.n(c),u=r(9),l=r(11),d=r(2),p=r(1);var h=Object(d.f)((function(e){var t=e.user,r=e.setUser,n=e.history;return Object(p.jsxs)("div",{className:"header",children:[Object(p.jsx)("h1",{className:"brand",children:"Nice To Meat You"}),Object(p.jsx)("nav",{children:t.id?Object(p.jsxs)("div",{children:[Object(p.jsx)(i.b,{to:"/Home",children:"Home"}),Object(p.jsx)("a",{href:"#",onClick:function(){localStorage.removeItem("token"),r({}),n.push("/")},children:"Log Out"})]}):Object(p.jsxs)("div",{children:[Object(p.jsx)(i.b,{to:"/login",children:"Login"}),Object(p.jsx)(i.b,{to:"/signup",children:"Sign Up"})]})})]})})),b=r(15),f=r(14),j=r.n(f);function m(){var e=localStorage.getItem("token");return e?{headers:{Authorization:"Bearer ".concat(e)}}:{}}function g(){return v.apply(this,arguments)}function v(){return(v=Object(u.a)(o.a.mark((function e(){var t,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.get("/api/users/me",m());case 3:return t=e.sent,r=t.data,e.abrupt("return",r);case 8:return e.prev=8,e.t0=e.catch(0),console.log("checkLogin(): User is not logged on.\n",e.t0),e.abrupt("return",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function x(e,t){return O.apply(this,arguments)}function O(){return(O=Object(u.a)(o.a.mark((function e(t,r){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("/api/users/login",{username:t,password:r});case 3:return n=e.sent,(a=n.data).token&&k(a.token),e.abrupt("return",a);case 9:return e.prev=9,e.t0=e.catch(0),console.error("login(): Unable to login.\n",e.t0),e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function y(e,t){return w.apply(this,arguments)}function w(){return(w=Object(u.a)(o.a.mark((function e(t,r){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("/api/users/register",{username:t,password:r});case 3:return n=e.sent,(a=n.data).token&&k(a.token),e.abrupt("return",a);case 9:return e.prev=9,e.t0=e.catch(0),console.error("register(): Unable to register user.\n",e.t0),e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}function k(e){localStorage.setItem("token",e)}var N=function(e){var t=Object(n.useState)({}),r=Object(l.a)(t,2),a=r[0],s=r[1];return Object(n.useEffect)((function(){function t(){return(t=Object(u.a)(o.a.mark((function t(){var r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g();case 2:r=t.sent,console.log(r),r.id?s(r):e.history.push("/login");case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),Object(p.jsx)("div",{className:"Home",children:Object(p.jsxs)("h1",{children:["Welcome home, ",a.username]})})};var S=function(e){var t=e.type,r=e.setUser,a=Object(n.useState)(""),s=Object(l.a)(a,2),i=s[0],c=s[1],d=Object(n.useState)(""),h=Object(l.a)(d,2),b=h[0],f=h[1];function j(){return(j=Object(u.a)(o.a.mark((function n(a){var s;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a.preventDefault(),i&&b){n.next=5;break}return n.abrupt("return");case 5:if(n.prev=5,"login"!==t){n.next=12;break}return n.next=9,x(i,b);case 9:n.t0=n.sent,n.next=15;break;case 12:return n.next=14,y(i,b);case 14:n.t0=n.sent;case 15:if(!(s=n.t0).user){n.next=24;break}return n.next=19,c("");case 19:return n.next=21,f("");case 21:return n.next=23,r(s.user);case 23:e.history.push("/home");case 24:n.next=29;break;case 26:n.prev=26,n.t1=n.catch(5),console.log(n.t1);case 29:case"end":return n.stop()}}),n,null,[[5,26]])})))).apply(this,arguments)}return Object(p.jsxs)("form",{className:"AuthForm",onSubmit:function(e){return j.apply(this,arguments)},children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("label",{htmlFor:"username",children:"Username:"}),Object(p.jsx)("input",{id:"username",value:i,type:"text",placeholder:"Type your username",onChange:function(e){return c(e.target.value)}})]}),Object(p.jsxs)("div",{children:[Object(p.jsx)("label",{htmlFor:"password",children:"Password:"}),Object(p.jsx)("input",{id:"password",value:b,type:"text",placeholder:"Type your password",onChange:function(e){return f(e.target.value)}})]}),Object(p.jsx)("button",{type:"submit",children:"login"===t?"Login":"Register"})]})};var _=function(e){return Object(p.jsx)("div",{className:"landing",children:"This is a landing page"})};var A=Object(d.f)((function(e){e.user;var t=e.setUser;return Object(p.jsxs)(d.c,{children:[Object(p.jsx)(d.a,{path:"/login",render:function(e){return Object(p.jsx)(S,Object(b.a)(Object(b.a)({type:"login"},e),{},{setUser:t}))}}),Object(p.jsx)(d.a,{path:"/signup",render:function(e){return Object(p.jsx)(S,Object(b.a)(Object(b.a)({type:"register"},e),{},{setUser:t}))}}),Object(p.jsx)(d.a,{path:"/home",component:N}),Object(p.jsx)(d.a,{path:"/",component:_})]})})),U=(r(60),{products:[{_id:"1",name:"Prime Porterhouse, Wet Aged 20oz",price:"38",description:"Indeed the very best of both worlds, this is one hearty steak. On one side, a tender Filet Mignon; on the other side, an intensely flavorful NY Strip.  Doesn\u2019t get much better than this! Wet aged.",category:"beef",image:"/images/image_11.jpeg"},{_id:"2",name:"Filet - Prime, Wet Aged 10oz",price:"34",description:"This is the most incredibly tender, buttery texture that is center cut from a pristine tenderloin and crafted by hand. Subtly marbled that enhances an even greater depth of flavor.  If you\u2019ve been wanting a filet that will literally melt in your mouth- you found it! ",category:"beef",image:"/images/image_21.jpg"},{_id:"3",name:"14 oz Bone-In Filet Prime, Wet Aged",price:"42",description:"",category:"beef",image:"/images/image_31.png"},{_id:"4",name:"NY Strip - Prime, Wet Aged 16oz",price:"38",description:"A steakhouse staple. Sourced from the short loin, the strip is another tender cut of beef. A cut favored for its beefy flavor, our Strip Steaks are center cut, (no tough tendons here), and offer a bit less marbling than a Ribeye. All while providing a cut that is incredibly tender & flavorful. ",category:"beef",image:"/images/image_41.jpg"},{_id:"5",name:"NY Strip - Prime, Dry Aged 16oz",price:"36",description:"A cut favored for its beefy flavor, our Strip Steaks are center-cut, (no tough tendons here), and offer less marbling than a Ribeye, while providing just enough to produce a cut that is incredibly tender, rich & flavorful. Its fine marbling and 41-day aging results in a more pronounced, nuttier flavor.",category:"beef",image:"/images/image_51.jpg"},{_id:"6",name:"Boneless Ribeye - Prime, Wet Aged 16oz",price:"31",description:"The Ribeye gets such high praise because it\u2019s the most well-marbled of all the steaks and tender to boot. We handcraft this steak to showcase the brilliantly marbled center, including a nice \u201cRib Eye Cap\u201d on one end which is loaded with delicious flavor. ",category:"beef",image:"/images/image_61.jpg"},{_id:"7",name:"36 oz Tomahawk Prime, Wet Aged",price:"64",description:"Our Happy To Meat You Prime Tomahawk Ribeye is a true stand out.   Essentially an incredibly flavorful, tender and well marbled ribeye steak, this grand dame of the beef world is specifically cut with at least five inches of rib bone left intact and can feed 2-3 people.  Perfect any time, but especially when served at your next dinner party or grilling event or even as an ever so welcomed gift of great taste!",category:"beef",image:"/images/image_71.jpg"}]});var P=function(){var e=Object(n.useState)({}),t=Object(l.a)(e,2),r=t[0],a=t[1];return Object(n.useEffect)((function(){(function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:(t=e.sent).id&&a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)(h,{user:r,setUser:a}),Object(p.jsx)(A,{user:r,setUser:a}),Object(p.jsxs)("div",{className:"grid-container",children:[Object(p.jsx)("main",{children:Object(p.jsx)("div",{className:"row center",children:U.products.map((function(e){return Object(p.jsxs)("div",{className:"card",children:[Object(p.jsx)("a",{href:"/product/".concat(e._id),children:Object(p.jsx)("img",{className:"medium",src:e.image,alt:e.image})}),Object(p.jsxs)("div",{className:"card-body",children:[Object(p.jsx)("a",{href:"/product/".concat(e._id),children:Object(p.jsx)("h2",{className:"productname",children:e.name})}),Object(p.jsxs)("div",{className:"price",children:["$",e.price]})]})]},e._id)}))})}),Object(p.jsx)("footer",{className:"row center",children:"All right reserved"})]})]})};s.a.render(Object(p.jsx)(i.a,{children:Object(p.jsx)(P,{})}),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.fc721b8b.chunk.js.map