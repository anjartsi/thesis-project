webpackJsonp([0],{"+w4S":function(t,e,s){"use strict";var n=s("/Hcn");e.a={components:{NiceButton:n.a},props:["funcs","speed","finished"],data:function(){return{playing:!1,t1:null,t2:null,dt:this.speed,intervalID:null}},methods:{play:function(){this.playing||(this.playing=!0,this.automate())},pause:function(){this.playing&&(this.playing=!1,window.clearInterval(this.intervalID))},automate:function(){this.playing&&(this.intervalID=window.setInterval(this.doEverythingOnce,this.dt))},doEverythingOnce:function(){if(this.finished)this.pause();else for(var t=0;t<this.funcs.length;t++)this.funcs[t]()},faster:function(){this.dt=Math.max(this.dt/2,125),this.playing&&(this.pause(),this.play())},slower:function(){this.dt=Math.min(2*this.dt,4e3),this.playing&&(this.pause(),this.play())}}}},"/+J+":function(t,e){},"/Hcn":function(t,e,s){"use strict";function n(t){s("t62z")}var i=s("DcI7"),a=s("4Sl+"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-df0f9b76",null);e.a=c.exports},"/jK8":function(t,e,s){"use strict";function n(t){s("zJjq")}var i=s("FMI4"),a=s("BnLp"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-9471cc96",null);e.a=c.exports},"0uka":function(t,e){},"1lJi":function(t,e){},"2TG3":function(t,e,s){"use strict";function n(t){s("5XYE")}var i=s("YvKZ"),a=s("Jl47"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-041cb644",null);e.a=c.exports},"39RL":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("div",{staticClass:"row"},[t._m(1),s("div",{staticClass:"col-xs-10"},t._l(t.unmatched.men,function(e){return s("div",{class:{clickable:t.clickable},staticStyle:{display:"inline-block"},on:{click:function(s){t.$emit("nextManClickedEvent",e)}}},[s("SM-person-box",{attrs:{gender:"m",index:e}})],1)}))]),s("div",{staticClass:"row"},[t._m(2),s("div",{staticClass:"col-xs-10"},t._l(t.unmatched.women,function(t){return s("SM-person-box",{key:t,attrs:{gender:"w",index:t}})}))])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 text-center"},[s("h3",[t._v("Unmatched")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-2"},[s("h4",[t._v("Men:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-2"},[s("h4",[t._v("Women:")])])}],a={render:n,staticRenderFns:i};e.a=a},"3OsL":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-3 col-lg-2"},[s("div",{staticClass:"row"},[s("nice-button-lock",{attrs:{isLocked:t.locked},on:{click:t.lock}})],1),s("br"),s("div",{staticClass:"row"},[t.locked?s("div",[t._m(1)]):s("div",[s("div",{staticClass:"row"},[s("problem-size-control",{attrs:{problemSize:t.problemSize,min:"1",max:"10"},on:{input:t.changeProblemSize},model:{value:t.problemSize,callback:function(e){t.problemSize=e},expression:"problemSize"}})],1),s("br"),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12"},[s("nice-button",{nativeOn:{click:function(e){t.randomize(e)}}},[t._v("Randomize")])],1)]),s("br"),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12"},[s("nice-button",{nativeOn:{click:function(e){t.reset(e)}}},[t._v("Reset")])],1)])])])]),s("div",{staticClass:"col-xs-9 col-lg-10"},[s("h3",{staticStyle:{"text-align":"center"}},[t._v("Preference Lists")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 col-lg-6"},[s("h4",{staticStyle:{"text-align":"center"}},[t._v("Men")]),s("SM-preference-list",{attrs:{isGender:"m",likesGender:"w",n:t.n,locked:t.locked,"preference-list":t.preferences.m,colors:t.colors},on:{reorderBoxes:t.swap}})],1),s("div",{staticClass:"col-xs-12 col-lg-6"},[s("h4",{staticStyle:{"text-align":"center"}},[t._v("Women")]),s("SM-preference-list",{attrs:{isGender:"w",likesGender:"m",n:t.n,locked:t.locked,"preference-list":t.preferences.w,colors:t.colors},on:{reorderBoxes:t.swap}})],1)])])])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("h2",[t._v("The Problem Instance")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"alert alert-warning text-center"},[s("h4",[t._v("You must unlock the instance to change it")]),s("h4",[s("strong",[t._v("Warning:")]),t._v(" Unlocking the instance will erase all progress made in the solver")])])}],a={render:n,staticRenderFns:i};e.a=a},"3RgN":function(t,e,s){"use strict";function n(t){s("/+J+")}var i=s("iAM8"),a=s("39RL"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-0635891d",null);e.a=c.exports},"3wNg":function(t,e,s){"use strict";function n(t){s("xJJd")}var i=s("xEvC"),a=s("kj3m"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-2b52070a",null);e.a=c.exports},"4Sl+":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{staticClass:"btn btn-block btn-lg",on:{click:function(e){t.$emit("click")}}},[t._t("default",[t._v("Don't Push Me")])],2)},i=[],a={render:n,staticRenderFns:i};e.a=a},"4vM8":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row cant-highlight-text"},[s("h1",[t._v("Stable Marriage")]),s("div",{staticClass:"col-xs-2"},[s("nice-button",{on:{click:t.increment}})],1)]),s("hr"),s("div",{staticClass:"row cant-highlight-text"},[s("SM-instance-maker",{attrs:{n:t.n,preferences:t.preferences,locked:t.locked,colors:t.colors},on:{"update:n":function(e){t.n=e},"update:locked":function(e){t.locked=e}}})],1),s("hr"),t.locked?t._e():s("div",{staticClass:"alert alert-warning text-center"},[s("h3",[t._v("You must "),s("strong",{staticClass:"text-warning",attrs:{id:"second-lock"},on:{click:function(e){t.locked=!t.locked}}},[t._v("lock the instance")]),t._v(" before trying to solve it")])]),s("div",{staticClass:"row cant-highlight-text"},[t.locked?s("SM-solver",{attrs:{locked:t.locked,preferences:t.preferences,n:t.n,colors:t.colors}}):t._e()],1)])},i=[],a={render:n,staticRenderFns:i};e.a=a},"5XBn":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("nav-bar"),s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-1 pageBorder"}),s("div",{staticClass:"col-xs-10"},[s("router-view")],1),s("div",{staticClass:"col-xs-1 pageBorder"})])]),s("my-footer")],1)},i=[],a={render:n,staticRenderFns:i};e.a=a},"5XYE":function(t,e){},"7LuJ":function(t,e,s){"use strict";function n(t){s("l1Oe")}var i=s("KSuI"),a=s("3OsL"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,null,null);e.a=c.exports},"867l":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"navbar navbar-inverse"},[s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"navbar-header"},[t._m(0),s("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[t._v("FwA")])],1),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"nvbar-collapse-1"}},t._l(t.nav,function(e){return s("ul",{staticClass:"nav navbar-nav"},[s("li",[s("router-link",{attrs:{to:e.link}},[t._v(t._s(e.text))])],1)])}))])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"navbar-toggle collapsed",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbar-collapse-1","aria-expanded":"false"}},[s("span",{staticClass:"sr-only"},[t._v("Toggle navigation")]),s("span",{staticClass:"icon-bar"}),s("span",{staticClass:"icon-bar"}),s("span",{staticClass:"icon-bar"})])}],a={render:n,staticRenderFns:i};e.a=a},9531:function(t,e,s){"use strict";function n(t){s("yS5j")}var i=s("Lu3p"),a=s("Rh5i"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-80bb8540",null);e.a=c.exports},"9Aix":function(t,e){},AoRf:function(t,e,s){"use strict";function n(t){s("z/0R")}var i=s("+w4S"),a=s("y1+k"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-5b385431",null);e.a=c.exports},BnLp:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"preferenceBox",on:{mousedown:function(e){t.$emit("boxMouseDown",t.j)},mouseup:function(e){t.$emit("boxMouseUp",t.j)},mouseenter:function(e){t.$emit("boxMouseEnter",t.j)},mouseleave:function(e){t.$emit("boxMouseLeave",t.j)}}},[s("SM-person-box",{attrs:{gender:t.likesGender,index:t.preferenceBox}})],1)},i=[],a={render:n,staticRenderFns:i};e.a=a},DEtk:function(t,e,s){"use strict";e.a={data:function(){return{nav:[{link:"/",text:"Home"},{link:"/stable-marriage",text:"Stable Marriage"}]}}}},DRgm:function(t,e,s){"use strict";var n=s("2TG3");e.a={components:{SMPreferenceRow:n.a},props:["preferenceList","isGender","likesGender","n","locked","colors"],data:function(){return{}},methods:{reorderBoxes:function(t,e,s,n){this.$emit("reorderBoxes",t,e,s,n)}}}},DcI7:function(t,e,s){"use strict";e.a={name:"NiceButton",data:function(){return{}}}},FMI4:function(t,e,s){"use strict";var n=s("3wNg");e.a={components:{SMPersonBox:n.a},props:["isGender","likesGender","n","j","preferenceBox","colors"],data:function(){return{}},methods:{}}},GUTb:function(t,e,s){"use strict";e.a={data:function(){return{chapters:[{name:"Intro",abbreviation:"intro"},{name:"Greedy Algorithms",abbreviation:"greedy"},{name:"Divide and Conquer",abbreviation:"divide"},{name:"Dynamic Programming",abbreviation:"dynamic"},{name:"Network Flow",abbreviation:"network"}],topics:[{name:"Stable Marriage",link:"stable-marriage",chapter:"intro"},{name:"Interval Scheduling",chapter:"greedy"},{name:"Minimize Lateness",chapter:"greedy"},{name:"Huffman Code",chapter:"greedy"},{name:"Counting Inversions",chapter:"divide"},{name:"Closest Pair of Points",chapter:"divide"},{name:"Weighted Interval Scheduling",chapter:"dynamic"},{name:"Segmented Least Squares",chapter:"dynamic"},{name:"Largest Common Substring",chapter:"dynamic"},{name:"Subset Sum",chapter:"dynamic"},{name:"Knapsack Problem",chapter:"dynamic"},{name:"Ford-Fulkerson",chapter:"network"},{name:"Preflow Push",chapter:"network"}]}}}},GjtC:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},t._l(t.n,function(e){return s("SM-preference-row",{key:e,attrs:{isGender:t.isGender,likesGender:t.likesGender,n:t.n,i:e,locked:t.locked,"preference-list-row":t.preferenceList[e-1],colors:t.colors},on:{reorderBoxes:t.reorderBoxes}})}))},i=[],a={render:n,staticRenderFns:i};e.a=a},Jl47:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-1"},[s("p",{style:{color:t.colors[t.i-1]}},[t._v(t._s(t.isGender)),s("sub",[t._v(t._s(t.i))])])]),s("div",{staticClass:"col-xs-11",attrs:{id:"boxContainer"},on:{mouseup:t.dragStop,mouseleave:t.dragStop}},t._l(t.n,function(e){return s("SM-preference-box",{key:e,class:{unlocked:!t.locked},attrs:{isGender:t.isGender,likesGender:t.likesGender,n:t.n,j:e,colors:t.colors,"preference-box":t.PreferenceListRow[e-1]},on:{boxMouseDown:t.dragStart,boxMouseUp:t.dragStop,boxMouseEnter:t.dragCommence,boxMouseLeave:function(t){}}})}))])},i=[],a={render:n,staticRenderFns:i};e.a=a},"K+yJ":function(t,e){},KSuI:function(t,e,s){"use strict";var n=s("/Hcn"),i=s("R8ZA"),a=s("w+Gs"),o=s("nFoH");e.a={components:{NiceButton:n.a,NiceButtonLock:i.a,ProblemSizeControl:a.a,SMPreferenceList:o.a},props:["preferences","locked","n","colors"],data:function(){return{problemSize:this.n,isLocked:this.locked}},watch:{locked:function(t){this.isLocked=t}},methods:{changeProblemSize:function(){this.$emit("update:n",this.problemSize),this.problemSize=Math.min(10,this.problemSize),this.problemSize=Math.max(1,this.problemSize);for(var t in this.preferences)if("m"===t||"w"===t){var e=this.preferences[t];this.checkNumRows(e);for(var s=0;s<this.problemSize;s++)this.checkPreferenceRow(e[s])}},checkNumRows:function(t){if(t.length<this.problemSize)for(var e=t.length;e<this.problemSize;e++)t.push([]);else t.length>this.problemSize&&t.splice(this.problemSize)},checkPreferenceRow:function(t){if(t.length<this.problemSize)for(var e=t.length;e<this.problemSize;e++)t.push(e);else if(t.length>this.problemSize)for(var s=0;s<t.length;s++)t[s]>=this.problemSize&&(t.splice(s,1),s--)},swap:function(t,e,s,n){if(!this.locked){var i=this.preferences[t][e],a=i[s];i[s]=i[n],i.splice(n,1,a)}},randomize:function(){for(var t=void 0,e=void 0,s=void 0,n=void 0,i=this.problemSize-1,a=0;a<this.problemSize*this.problemSize;a++)t=Math.random()>=.5?"m":"w",e=Math.floor(0+(1+i-0)*Math.random()),s=Math.floor(0+(1+i-0)*Math.random()),n=Math.floor(0+(1+i-0)*Math.random()),"m"===t&&0===e||this.swap(t,e,s,n)},reset:function(){var t=this.problemSize;this.problemSize=1,this.changeProblemSize(),this.problemSize=t,this.changeProblemSize()},lock:function(){this.isLocked=!this.isLocked,this.$emit("update:locked",this.isLocked)}},created:function(){this.problemSize=3,this.changeProblemSize()}}},LU4o:function(t,e,s){"use strict";e.a={}},Lu3p:function(t,e,s){"use strict";var n=s("3wNg");e.a={components:{SMPersonBox:n.a},data:function(){return{}},props:["n","colors","tentative"]}},M93x:function(t,e,s){"use strict";function n(t){s("sUjX")}var i=s("xJD8"),a=s("5XBn"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-5d07e3b4",null);e.a=c.exports},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),i=s("M93x"),a=s("YaEn");s("uWbR"),s("ShJz"),n.a.config.productionTip=!1,new n.a({el:"#app",router:a.a,template:"<App/>",components:{App:i.a}})},PFOV:function(t,e,s){"use strict";function n(t){s("K+yJ")}var i=s("wEI+"),a=s("4vM8"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,null,null);e.a=c.exports},Pe2K:function(t,e){},Pg4r:function(t,e,s){"use strict";e.a={props:["problemSize","min","max"],components:{},data:function(){return{n:this.problemSize}}}},R8ZA:function(t,e,s){"use strict";function n(t){s("9Aix")}var i=s("c1+n"),a=s("tuaq"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-16b1a0e0",null);e.a=c.exports},"Rc5+":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 col-lg-6"},[t._m(1),s("div",{staticClass:"col-xs-12"},t._l(t.chapters,function(e){return s("h3",[t._v(t._s(e.name)),s("ul",t._l(t.topics,function(n){return n.chapter===e.abbreviation?s("li",[s("h4",[n.link?s("router-link",{attrs:{to:n.link}},[t._v(t._s(n.name))]):s("p",[t._v(t._s(n.name))])],1)]):t._e()}))])}))]),t._m(2)])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12"},[s("h1",[t._v("Welcome to Fun with Algorithms!")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-12"},[s("h2",[t._v("Problems")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-12 col-lg-6"},[s("div",{staticClass:"col-xs-12"},[s("h2",[t._v("What is this?")])]),s("div",{staticClass:"col-xs-12"},[s("ul",[s("li",[s("p",[t._v("This website is designed to help teach (and learn) the process of some algorithms (also makes them fun)")])]),s("li",[s("p",[t._v("You can create an instance of a problem, and see how the solution is found, step by step!")])])])])])}],a={render:n,staticRenderFns:i};e.a=a},Rh5i:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("div",{staticClass:"row"},[t.n<=3?s("div",[s("div",{staticClass:"col-xs-12"},t._l(t.n,function(e){return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-2"},[s("h4",[t._v(t._s(e)+" .)")])]),t.tentative[e-1]?s("div",{staticClass:"col-xs-10"},[s("SM-person-box",{attrs:{gender:"m",index:t.tentative[e-1].man}}),s("SM-person-box",{attrs:{gender:"w",index:t.tentative[e-1].woman}})],1):t._e()])}))]):s("div",[s("div",{staticClass:"col-xs-6"},t._l(t.n,function(e){return e<=(t.n+1)/2?s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-2"},[s("h4",[t._v(t._s(e)+".)")])]),t.tentative[e-1]?s("div",{staticClass:"col-xs-10"},[s("SM-person-box",{attrs:{gender:"m",index:t.tentative[e-1].man}}),s("SM-person-box",{attrs:{gender:"w",index:t.tentative[e-1].woman}})],1):t._e()]):t._e()})),s("div",{staticClass:"col-xs-6"},t._l(t.n,function(e){return e>(t.n+1)/2?s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-2"},[s("h4",[t._v(t._s(e)+".)")])]),t.tentative[e-1]?s("div",{staticClass:"col-xs-10"},[s("SM-person-box",{attrs:{gender:"m",index:t.tentative[e-1].man}}),s("SM-person-box",{attrs:{gender:"w",index:t.tentative[e-1].woman}})],1):t._e()]):t._e()}))])])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 text-center"},[s("h3",[t._v("Tentatively Matched")])])])}],a={render:n,staticRenderFns:i};e.a=a},ShJz:function(t,e){},WBte:function(t,e,s){"use strict";var n=s("/Hcn"),i=s("AoRf"),a=s("3RgN"),o=s("9531"),r=s("c0b0");e.a={components:{SMSolverUnmatched:a.a,SMSolverTentative:o.a,SMSolverProposal:r.a,NiceButton:n.a,NiceAutomator:i.a},props:["locked","n","preferences","colors"],created:function(){this.reset()},data:function(){return{ready:this.locked,unmatched:{men:[],women:[]},tentatives:[],rejections:[],proposingMan:-1,proposedToWoman:-1,proposals:0,message:"Click to perform the next step of the algorithm",nextMan:{selected:0,clickedMan:-1,options:[{text:"Least Recently Unmatched",value:0,whoProposes:function(){return 0}},{text:"Most Recently Unmatched",value:1,whoProposes:function(t){return t-1}},{text:"Random",value:2,whoProposes:function(t){return Math.floor(0+(1+t-1)*Math.random())}},{text:"Choose By Clicking",value:3,whoProposes:function(){return-1}}]}}},computed:{solved:function(){var t=this.tentatives.length===this.n;return t},clickable:function(){return this.nextMan.options[this.nextMan.selected].text.toLowerCase().includes("clicking")}},watch:{locked:function(t){this.ready=t,this.ready&&this.reset()}},methods:{reset:function(){this.unmatched.men=[],this.unmatched.women=[];for(var t=0;t<this.n;t++)this.$set(this.unmatched.men,t,t),this.$set(this.unmatched.women,t,t);this.rejections=[];for(var e=0;e<this.n;e++){this.rejections.push([]);for(var s=0;s<this.n;s++)this.rejections[e].push(!1)}this.tentatives=[]},removeFromArray:function(t,e){var s=t.indexOf(e);-1!==s&&this.$delete(t,s)},proposeDispose:function(){-1===this.proposingMan?this.propose():-1!==this.proposedToWoman?this.respond():this.propose(),this.solved&&(this.message="All people have been matched. The algorithm terminates")},propose:function(){var t=this.nextMan.options[this.nextMan.selected].whoProposes(this.unmatched.men.length);if(-1===t&&(t=this.nextMan.clickedMan),-1!==t&&this.unmatched.men.length>0){this.proposingMan=this.unmatched.men[t];for(var e=0,s=!0;s;)this.proposedToWoman=this.preferences.m[this.proposingMan][e],s=this.rejections[this.proposingMan][this.proposedToWoman],e++;this.message="Man "+(this.proposingMan+1)+" proposes to Woman "+(this.proposedToWoman+1)}},respond:function(){if(-1!==this.proposingMan&&-1!==this.proposedToWoman){this.proposals+=1;for(var t=this.preferences.w[this.proposedToWoman],e=void 0,s=-1,n=0;n<this.tentatives.length;n++)this.tentatives[n].woman===this.proposedToWoman&&(e=this.tentatives[n].man,s=n);-1===s?(this.tentatives.push({man:this.proposingMan,woman:this.proposedToWoman}),this.removeFromArray(this.unmatched.women,this.proposedToWoman),this.removeFromArray(this.unmatched.men,this.proposingMan),this.message="Woman "+(this.proposedToWoman+1)+" is unmatched, so she accepts.",this.proposingMan=-1):t.indexOf(e)<t.indexOf(this.proposingMan)?(this.$set(this.rejections[this.proposingMan],this.proposedToWoman,!0),this.message="Woman "+(this.proposedToWoman+1)+" prefers her current tentative match"):(this.removeFromArray(this.unmatched.men,this.proposingMan),this.$set(this.rejections[e],this.proposedToWoman,!0),this.unmatched.men.push(e),this.$delete(this.tentatives,s),this.tentatives.push({man:this.proposingMan,woman:this.proposedToWoman}),this.message="Woman "+(this.proposedToWoman+1)+" likes "+(this.proposingMan+1)+" more than her tentative match ("+e+"), she accepts the proposal.",this.proposingMan=-1),this.tentatives.sort(function(t,e){return t.man-e.man}),this.proposedToWoman=-1}},changeNextManStyle:function(){this.nextManStyle+=1,this.nextManStyle%=this.nextMan.length},nextManClickedEventHandler:function(t){this.clickable&&(this.nextMan.clickedMan=this.unmatched.men.indexOf(t),this.proposingMan===t?this.proposeDispose():(this.proposingMan=-1,this.proposeDispose()),this.nextMan.clickedMan=-1)}}}},Wjsk:function(t,e){},YaEn:function(t,e,s){"use strict";var n=s("7+uW"),i=s("/ocq"),a=s("wrM5"),o=s("PFOV");n.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Home",component:a.a},{path:"/stable-marriage",name:"Stable Marriage",component:o.a}]})},YvKZ:function(t,e,s){"use strict";var n=s("/jK8");e.a={components:{SMPreferenceBox:n.a},props:["PreferenceListRow","isGender","likesGender","n","i","locked","colors"],data:function(){return{dragging:!1,boxToDrag:null}},methods:{dragStart:function(t){this.dragging=!0,this.boxToDrag=t},dragCommence:function(t){this.dragging&&(this.reorder(this.boxToDrag,t),this.boxToDrag=t)},dragStop:function(){this.dragging=!1,this.boxToDrag=null},reorder:function(t,e){this.$emit("reorderBoxes",this.isGender,this.i-1,t-1,e-1)}}}},ZRgc:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("div",{staticClass:"row text-center"},[s("div",{staticClass:"col-xs-6 col-md-4 text-center"},[t._m(1),t.solved?t._e():s("div",[s("select",{directives:[{name:"model",rawName:"v-model",value:t.nextMan.selected,expression:"nextMan.selected"}],staticClass:"input-lg",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.nextMan,"selected",e.target.multiple?s:s[0])}}},t._l(t.nextMan.options,function(e){return s("option",{domProps:{value:e.value}},[t._v(t._s(e.text))])}))])]),s("div",{staticClass:"col-xs-4 col-md-3 col-xl-2"},[t._m(2),t.clickable||t.solved?t._e():s("nice-button",{staticClass:"btn-primary",class:{disabled:!t.locked},on:{click:t.proposeDispose}},[t._v("Propose / Dispose")])],1),s("div",{staticClass:"col-xs-12 col-md-5 col-xl-4"},[t._m(3),s("div",{staticClass:"col-xs-12"},[s("div",{staticClass:"alert alert-info"},[s("h4",[t._v(t._s(t.message)+"    ")])])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-6 col-lg-4 col-xl-3"},[s("SMSolver-tentative",{attrs:{id:"solver",n:t.n,colors:t.colors,tentative:t.tentatives}})],1),s("div",{staticClass:"col-xs-6 col-lg-8 col-xl-9"},[s("div",{staticClass:"col-xs-12 col-lg-6"},[s("SMSolver-unmatched",{attrs:{n:t.n,colors:t.colors,unmatched:t.unmatched,clickable:t.clickable},on:{nextManClickedEvent:t.nextManClickedEventHandler}})],1),s("div",{staticClass:"col-xs-12 col-lg-6"},[s("SMSolver-proposal",{attrs:{n:t.n,colors:t.colors,proposingMan:t.proposingMan,proposedToWoman:t.proposedToWoman,preferences:t.preferences,rejections:t.rejections,solved:t.solved,proposals:t.proposals}})],1)])]),s("hr"),s("div",{staticClass:"row"},[t.clickable?t._e():s("nice-automator",{attrs:{funcs:[t.proposeDispose],speed:500,finished:t.solved}})],1)])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("h2",[t._v("Solver")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-12"},[s("label",[t._v("Who proposes next?")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-12"},[s("label",[t._v("Next Step")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-12"},[s("label",[t._v("Message")])])}],a={render:n,staticRenderFns:i};e.a=a},c0b0:function(t,e,s){"use strict";function n(t){s("Pe2K")}var i=s("zFQ8"),a=s("cHC6"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-c3bcfca0",null);e.a=c.exports},"c1+n":function(t,e,s){"use strict";var n=s("/Hcn");e.a={name:"NiceButtonLock",components:{NiceButton:n.a},props:["isLocked"],data:function(){return{}}}},cHC6:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 text-center"},[s("h3",[t._v("Next Proposal ("+t._s(t.proposals)+" total)")])])]),t.solved?s("div",[t._m(2)]):s("div",{attrs:{id:"minHeight"}},[t.proposingMan>-1?s("div",[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-1"},[s("SM-person-box",{attrs:{gender:"m",index:t.proposingMan}})],1),s("div",{staticClass:"col-xs-1"}),s("div",{staticClass:"col-xs-10"},t._l(t.preferences.m[t.proposingMan],function(e,n){return s("SM-person-box",{key:n,attrs:{gender:"w",index:e,rejected:t.rejections[t.proposingMan][e]}})}))]),s("hr"),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-1"}),s("div",{staticClass:"col-xs-10"},[t.proposingMan>-1?s("SM-person-box",{attrs:{gender:"m",index:t.proposingMan}}):t._e(),t._m(0),t.proposedToWoman>-1?s("SM-person-box",{attrs:{gender:"w",index:t.proposedToWoman}},[s("p",[t._v("w"),s("sub",[t._v(t._s(t.proposedToWoman)+" ")])])]):t._e()],1)]),s("hr"),t.proposedToWoman>-1?s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-1"},[s("SM-person-box",{attrs:{gender:"w",index:t.proposedToWoman}})],1),s("div",{staticClass:"col-xs-1"}),s("div",{staticClass:"col-xs-10"},t._l(t.preferences.w[t.proposedToWoman],function(e,n){return s("SM-person-box",{key:n,attrs:{gender:"m",index:e,rejected:t.rejections[e][t.proposedToWoman]}})}))]):t._e()]):s("div",{staticClass:"row"},[t._m(1)])])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{display:"inline-block"},attrs:{id:"proposing"}},[s("i",{staticClass:"fa fa-arrow-right fa-3x"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"alert alert-info text-center"},[s("h4",[t._v("Waiting for a proposal")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12"},[s("div",{staticClass:"alert alert-success text-center"},[s("h4",[t._v("All people have been matched. Hooray!")])])])])}],a={render:n,staticRenderFns:i};e.a=a},csv9:function(t,e){},"g2+m":function(t,e,s){"use strict";function n(t){s("gyAT")}var i=s("DEtk"),a=s("867l"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,null,null);e.a=c.exports},gmb4:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid"},[s("h3",{staticStyle:{"text-align":"center"}},[t._v("Problem Size")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12 text-center"},[s("label",{attrs:{for:"n1"}},[t._v("n =  ")]),s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.n,expression:"n",modifiers:{number:!0}}],staticClass:"text-center",attrs:{id:"n1",type:"number",min:t.min?t.min:1,max:t.max?t.max:10},domProps:{value:t.n},on:{input:[function(e){e.target.composing||(t.n=t._n(e.target.value))},function(e){t.$emit("input",t.n)}],blur:function(e){t.$forceUpdate()}}})])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-12"},[s("input",{directives:[{name:"model",rawName:"v-model.number",value:t.n,expression:"n",modifiers:{number:!0}}],staticClass:"range-slider__range",attrs:{type:"range",min:t.min?t.min:1,max:t.max?t.max:10},domProps:{value:t.n},on:{input:function(e){t.$emit("input",t.n)},__r:function(e){t.n=t._n(e.target.value)},blur:function(e){t.$forceUpdate()}}})])])])},i=[],a={render:n,staticRenderFns:i};e.a=a},gyAT:function(t,e){},iAM8:function(t,e,s){"use strict";var n=s("3wNg");e.a={components:{SMPersonBox:n.a},props:["n","colors","unmatched","clickable"],data:function(){return{}},methods:{}}},kFaZ:function(t,e){},kj3m:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{class:t.isGender,style:{"background-color":t.colors[t.index]}},[s("p",[t._v(t._s(t.isGender)),s("sub",[t._v(t._s(t.index+1))])]),t.rejected?s("i",{staticClass:"fa fa-times rejected"}):t._e()])},i=[],a={render:n,staticRenderFns:i};e.a=a},l1Oe:function(t,e){},nFoH:function(t,e,s){"use strict";function n(t){s("kFaZ")}var i=s("DRgm"),a=s("GjtC"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-609810b8",null);e.a=c.exports},pkkc:function(t,e,s){"use strict";function n(t){s("0uka")}var i=s("LU4o"),a=s("we++"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,null,null);e.a=c.exports},sUjX:function(t,e){},t62z:function(t,e){},tuaq:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.isLocked?s("nice-button",{staticClass:"btn-warning",on:{click:function(e){t.$emit("click")}}},[t._v("Unlock Instance "),s("i",{staticClass:"fa fa-unlock"})]):s("nice-button",{staticClass:"btn-warning",on:{click:function(e){t.$emit("click")}}},[t._v("Lock Instance "),s("i",{staticClass:"fa fa-lock"})])],1)},i=[],a={render:n,staticRenderFns:i};e.a=a},uWbR:function(t,e){},"w+Gs":function(t,e,s){"use strict";function n(t){s("Wjsk")}var i=s("Pg4r"),a=s("gmb4"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-13e39253",null);e.a=c.exports},"wEI+":function(t,e,s){"use strict";var n=s("7+uW"),i=s("NYxO"),a=s("/Hcn"),o=s("7LuJ"),r=s("zNBF"),c=s("3wNg");n.a.use(i.a);var l=new i.a.Store({state:{},mutations:{}});e.a={components:{SMInstanceMaker:o.a,NiceButton:a.a,SMSolver:r.a,SMPersonBox:c.a},store:l,data:function(){return{n:2,locked:!1,preferences:{m:[[0,1],[0,1]],w:[[0,1],[0,1]]},colors:["#0074D9","#FF4136","#2ECC40","#FFDC00","#7FDBFF","#F012BE","#01FF70","#FF851B","#39CCCC","#B10DC9","#DDDDDD","#AAAAAA"],needsUpdate:!0}},methods:{increment:function(){l.commit("increment")}},computed:{count:function(){return l.state.count}}}},"we++":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-fluid",attrs:{id:"footer"}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xs-1"}),s("div",{staticClass:"col-xs-10"},[s("div",{staticClass:"row",staticStyle:{"text-align":"center"}}),s("div",{staticClass:"col-xs-4"},[s("h5",[t._v("By: Armen Ourfalian")])]),s("div",{staticClass:"col-xs-4"},[s("h5",[t._v("Advisor: John Noga")])]),s("div",{staticClass:"col-xs-4"},[s("h5",[t._v("California State University, Northridge")])])])])])}],a={render:n,staticRenderFns:i};e.a=a},wrM5:function(t,e,s){"use strict";function n(t){s("csv9")}var i=s("GUTb"),a=s("Rc5+"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-4b3c03a8",null);e.a=c.exports},xEvC:function(t,e,s){"use strict";e.a={props:["gender","index","rejected"],data:function(){return{colors:["#0074D9","#FF4136","#2ECC40","#FFDC00","#7FDBFF","#F012BE","#01FF70","#FF851B","#39CCCC","#B10DC9","#DDDDDD","#AAAAAA"]}},computed:{likesGender:function(){return"m"===this.gender?"w":"m"},isGender:function(){return""===this.gender||"m"===this.gender||"man"===this.gender||"male"===this.gender?"m":"w"}}}},xJD8:function(t,e,s){"use strict";var n=s("g2+m"),i=s("pkkc");e.a={name:"app",components:{NavBar:n.a,MyFooter:i.a}}},xJJd:function(t,e){},"y1+k":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[t._m(0),s("div",{staticClass:"col-xs-5 col-lg-6 col-xl-7"},[s("div",{staticClass:"btn-group btn-group-lg"},[s("button",{staticClass:"btn btn-primary fastSlow",class:{disabled:t.finished},on:{click:t.slower}},[t._v("Slower"),s("br"),t._v("(÷ 2)")]),t.playing||t.finished?s("button",{staticClass:"btn btn-warning playPause",class:{disabled:t.finished},on:{click:t.pause}},[t._v("Pause Algorithm"),s("br"),s("i",{staticClass:"fa fa-pause"})]):s("button",{staticClass:"btn btn-success playPause",class:{disabled:t.finished},on:{click:t.play}},[t._v("Run Algorithm"),s("br"),s("i",{staticClass:"fa fa-play"})]),s("button",{staticClass:"btn btn-danger fastSlow",class:{disabled:t.finished},on:{click:t.faster}},[t._v("Faster"),s("br"),t._v("(× 2)")])])]),s("div",{staticClass:"col-xs-4"},[s("div",{staticClass:"row"},[t._m(1),s("div",{staticClass:"col-xs-5"},[s("h4",[t._v("×"+t._s(t.speed/t.dt))])])]),s("div",{staticClass:"row"},[t._m(2),s("div",{staticClass:"col-xs-5"},[s("h4",[t._v(t._s(t.dt/1e3)+" s")])])])])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-3 col-lg-2 col-xl-1"},[s("h3",[t._v("Automate")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-7"},[s("h4",[t._v("Current speed: ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-7"},[s("h4",[t._v("Time per iteration:")])])}],a={render:n,staticRenderFns:i};e.a=a},yS5j:function(t,e){},"z/0R":function(t,e){},zFQ8:function(t,e,s){"use strict";var n=s("3wNg");e.a={components:{SMPersonBox:n.a},data:function(){return{}},props:["n","colors","proposingMan","proposedToWoman","preferences","rejections","solved","proposals"],methods:{getMansPreference:function(t,e){return this.preferences.m[t][e]}}}},zJjq:function(t,e){},zNBF:function(t,e,s){"use strict";function n(t){s("1lJi")}var i=s("WBte"),a=s("ZRgc"),o=s("VU/8"),r=n,c=o(i.a,a.a,!1,r,"data-v-088af19e",null);e.a=c.exports}},["NHnr"]);
//# sourceMappingURL=app.6d3164a27be17ea5e4b0.js.map